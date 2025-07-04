import { of } from 'rxjs';

export function createMockApiService() {
  return jasmine.createSpyObj('ApiService', ['delete', 'post', 'get']);
}

export function createMockFormService() {
  const spy = jasmine.createSpyObj('FormService', ['showDeleteConfirm', 'openEditCreateModal']);
  spy.showDeleteConfirm.and.returnValue(of(true)); // default behavior
  return spy;
}

export function createMockAuthService() {
  const spy = jasmine.createSpyObj('AuthService', ['getUser', 'getToken']);
  spy.getUser.and.returnValue({ clinic_id: 123 });
  spy.getToken.and.returnValue('dsfsdf3434');
  return spy;
}