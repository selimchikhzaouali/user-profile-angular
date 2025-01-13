import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUserId = 3; // Set a fixed user ID for the test
  const mockUser = { id: mockUserId, name: 'Selim Chikh Zaouali', email: 'selim.chikhzaouali@gmail.com' };
  const mockTodos = [{ title: 'Buy milk' }, { title: 'Walk the dog' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Imports the HttpClientTestingModule
      providers: [UserService],
    });
    service = TestBed.inject(UserService); // Get the instance of the service
    httpMock = TestBed.inject(HttpTestingController); // Get the HttpTestingController
  });

  afterEach(() => {
    httpMock.verify(); // Ensures that there are no outstanding HTTP requests
  });

  it('should fetch a random user', () => {
  
    // Spy on Math.random() to always return the fixed value for the test
    spyOn(Math, 'random').and.returnValue((mockUserId - 1) / 10); // Ensures random ID is `mockUserId`
  
    // Make the API call
    service.getUser().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  
    // Expect a call to the correct URL
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/${mockUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser); // Return the mock user data
  
    // Verify no outstanding requests
    httpMock.verify();
  });

  it('should fetch todos for the user', () => {
    service.getUserTodos(1).subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos?userId=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos); // Return the mock todos data
  });

  it('should generate a random user ID between 1 and 10', () => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    expect(randomId).toBeGreaterThan(0);
    expect(randomId).toBeLessThan(11);
  });
});
