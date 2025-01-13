import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: { id: number; name: string; email: string } | undefined;
  userId: number | undefined;
  todos: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchTodos();
  }

  // Fetch a new random user
  fetchUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.userId = user.id; // Store the fetched user ID
      this.fetchTodos();
    },
    (error) => {
      this.errorMessage = "Failed to load user data. Please try again later.";
    });
  }

  // Refresh user profile on button click
  refreshUser(): void {
    this.isLoading = true; // Disable the button
    this.fetchUser();
    setTimeout(() => {
      this.isLoading = false; // Enable the button after some time or condition
    }, 500); // For example, after 2 seconds
  }

  // Fetch todos for the user
  fetchTodos(): void {
    if (this.user) {
      this.userService.getUserTodos(this.user.id).subscribe((todos) => {
        this.todos = todos;
      },
      (error) => {
        this.errorMessage = "Failed to load todos. Please try again later.";
      },
      () => {
        this.isLoading = false; // Hide spinner after todos are fetched
      });
    }
  }

}
