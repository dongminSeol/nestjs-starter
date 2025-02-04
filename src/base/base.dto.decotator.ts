export function UseDto(dtoClass: { new (...args: any[]): any }): ClassDecorator {
  return (ctor) => {
    if (!(dtoClass as unknown)) {
      throw new Error('UseDto 데코레이터 사용 시 dto 클래스가 필수 입니다.');
    }
    ctor.prototype.dtoClass = dtoClass;
  };
}
