

create schema live authorization test;
set check_function_bodies = false;
create domain live._code character varying(32) not null;

create table live.code_definition(
                                     cd__code live._code not null,
                                     cd__created_at timestamp with time zone not null default current_timestamp,
                                     cd__updated_at timestamp with time zone not null default current_timestamp,
                                     cd__name character varying(256) not null,
                                     cd__order integer not null default 0,
                                     cd__parent_code character varying(32),
                                     cd__description character varying(512),
                                     constraint code_definition_pkey primary key(cd__code)
);


create table live.member_key(
                                mk__id bigint not null generated always as identity
                                    (start with 10000001 increment by 1),
                                mk__created_at timestamp with time zone not null default current_timestamp,
                                mk__updated_at timestamp with time zone not null default current_timestamp,
                                mk__code__member_type live._code not null,
                                mk__is_agreed_service_terms boolean not null,
                                mk__is_agreed_privacy_policy boolean not null,
                                mk__deleted_at timestamp with time zone,
                                constraint member_key_pkey primary key(mk__id)
);
comment on column live.member_key.mk__code__member_type is 'SuperAdmin, Admin, User';

create table live.member_user(
                                 mk__id bigint not null,
                                 mu__created_at timestamp with time zone not null default current_timestamp,
                                 mu__updated_at timestamp with time zone not null default current_timestamp,
                                 mu__is_completed_boarding boolean not null default FALSE,
                                 mu__code__auth_type live._code not null,
                                 mu__mobile_number character varying(16),
                                 mu__email character varying(128),
                                 mu__open_id_iss character varying(128),
                                 mu__open_id_aud character varying(256),
                                 mu__open_id_sub character varying(256),
                                 constraint member_user_pkey primary key(mk__id)
);
comment on column live.member_user.mu__code__auth_type is 'Kakao: 카카오 회원 가입, Apple: 애플 회원 가입, MobilePhone: 문자 회원 가입';



create table live.member_data(
                                 mk__id bigint not null,
                                 md__created_at timestamp with time zone not null default current_timestamp,
                                 md__updated_at timestamp with time zone not null default current_timestamp,
                                 md__user_id character varying(32) not null,
                                 md__user_name character varying(32) not null,
                                 md__status_message character varying(32),
                                 md__profile_original_image_url character varying(256),
                                 md__profile_resized_image_url character varying(256),
                                 md__profile_thumbnail_image_url character varying(256),
                                 md__profile_additional_original_image_urls character varying(256)[],
                                 md__profile_additional_resized_image_urls character varying(256)[],
                                 md__profile_additional_thumbnail_image_urls character varying(256)[],
                                 constraint member_data_pkey primary key(mk__id)
);
create unique index member_data_md__user_id_idx on live.member_data(md__user_id);


alter table live.member_user add constraint member_user_mk__id_fkey foreign key (mk__id) references live.member_key (mk__id);
alter table live.member_data add constraint member_data_mk__id_fkey foreign key (mk__id) references live.member_key (mk__id);


create table live.log
(
    lg__id           bigserial              not null,
    lg__name         character varying(200) not null,
    lg__status       character varying(400) not null,
    lg__message      text,
    lg__start_time   character varying(100),
    lg__elapsed_time character varying(100),
    lg__ip_address   character varying(100),
    lg__create_at    timestamp with time zone default current_timestamp,
    constraint log_pkey primary key (lg__id)
);


create or replace procedure
    live.log_create_sp(p_name varchar, p_status varchar, p_message varchar, p_start_time varchar, p_elapsed_time varchar,
                       p_ip_address varchar, out row_count int, out message varchar)
    language plpgsql
as
$$
begin
insert into live.log(lg__name, lg__status, lg__message, lg__start_time, lg__elapsed_time, lg__ip_address)
values (p_name, p_status, p_message, p_start_time, p_elapsed_time, p_ip_address);

get diagnostics row_count := row_count;
message := 'OK';
exception
    when others then
        row_count := -1;
        message := '[' || sqlstate || '] ' || sqlerrm;
end;
$$;



create or replace procedure live.sp_v1_create_sso_account(
  arg_provider varchar,
  arg_iss varchar,
  arg_aud varchar,
  arg_sub varchar,
  arg_phone_number varchar,
  out id bigint,
  out row_count int,
  out message varchar
) language plpgsql
as $$
declare
member_key_insert_count int := 0;
  member_user_insert_count int := 0;
begin
begin
    if coalesce(arg_provider, '') = '' or
       coalesce(arg_iss, '') = '' or
       coalesce(arg_aud, '') = '' or
       coalesce(arg_sub, '') = '' then
      raise exception 'missing or empty arguments';
end if;

    if not exists (
      select m_k.mk__id
      from live.member_user as m_u
      join live.member_key  as m_k on m_u.mk__id = m_k.mk__id
      where m_u.mu__open_id_sub = ''
        and m_u.mu__is_completed_boarding = false
        and m_k.mk__deleted_at is null
    ) then
begin
insert into live.member_key (
    mk__is_agreed_service_terms,
    mk__is_agreed_privacy_policy,
    mk__code__member_type,
    mk__created_at,
    mk__updated_at
) values (
             true,
             true,
             'user',
             current_timestamp,
             current_timestamp
         ) returning mk__id into id;

get diagnostics member_key_insert_count = row_count;

insert into live.member_user (
    mk__id,
    mu__created_at,
    mu__updated_at,
    mu__is_completed_boarding,
    mu__code__auth_type,
    mu__open_id_iss,
    mu__open_id_aud,
    mu__open_id_sub,
    mu__mobile_number
) values (
             id,
             current_timestamp,
             current_timestamp,
             false,
             arg_provider,
             arg_iss,
             arg_aud,
             arg_sub,
             arg_phone_number
         );

get diagnostics member_user_insert_count = row_count;

exception
        when others then
          raise exception 'error during insertion: %', sqlerrm;
end;
end if;

    row_count = member_key_insert_count + member_user_insert_count;
    message = 'procedure executed successfully';
exception
    when others then
      raise exception 'error in procedure: %', sqlerrm;
end;
end;
$$;

create function live.fn_v1_find_sso_account(arg_sub character varying)
    returns TABLE(id bigint, is_completed_boarding boolean, user_id character varying, user_name character varying)
    language plpgsql
as
$$
begin
return query
select
    m_k.mk__id                    as id,
    m_u.mu__is_completed_boarding as is_completed_boarding,
    m_d.md__user_id               as user_id,
    m_d.md__user_name             as user_name
from
    live.member_user as m_u
        inner join
    live.member_key  as m_k  on m_k.mk__id = m_u.mk__id
        left join
    live.member_data as m_d  on m_d.mk__id = m_u.mk__id
where
        m_u.mu__open_id_sub = arg_sub
  and
    m_k.mk__deleted_at is null;
end;
$$;
