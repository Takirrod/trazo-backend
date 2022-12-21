import { CasbinGuard } from './casbin.guard';

describe('CasbinGuard', () => {
  it('should be defined', () => {
    expect(new CasbinGuard()).toBeDefined();
  });
});
