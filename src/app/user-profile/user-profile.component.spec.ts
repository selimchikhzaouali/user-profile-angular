import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../_services/user.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should fetch a user and display it', () => {
    const mockUser = { id: 1, name: 'Selim Chikh Zaouali', email: 'selim.chikhzaouali@gmail.com' };
    spyOn(userService, 'getUser').and.returnValue(of(mockUser));

    component.fetchUser(); // Correct method
    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
    expect(component.userId).toBe(1);
  });

  it('should refresh the user when the button is clicked', () => {
    const mockUser = { id: 2, name: 'Foulen Ben Foulen', email: 'foulen@example.com' };
    spyOn(userService, 'getUser').and.returnValue(of(mockUser));

    component.refreshUser(); // Correct method
    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
    expect(component.userId).toBe(2);
  });

  it('should fetch todos for the user', () => {
    const mockUser = { id: 1, name: 'Selim Chikh Zaouali', email: 'selim.chikhzaouali@gmail.com' };
    const mockTodos = [{ title: 'Buy milk' }, { title: 'Walk the dog' }];
    
    spyOn(userService, 'getUser').and.returnValue(of(mockUser));
    spyOn(userService, 'getUserTodos').and.returnValue(of(mockTodos));

    // Call getUser first (since it's also calling getTodos internally)
    component.fetchUser();
    fixture.detectChanges(); // Ensure change detection is triggered

    expect(component.todos.length).toBe(2);  // Check if the todos were fetched
    expect(component.todos).toEqual(mockTodos); // Check if the todos match
  });

});
