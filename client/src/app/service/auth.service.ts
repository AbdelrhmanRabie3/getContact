import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

const apiUrl = "http://localhost:3000/api";
interface LoginResponse {
  status: string;
  data: {
    user: {
      username: string;
      role: string;
    };
    token: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "user_data";
  private isLoggedIn = signal<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((response) => {
          if (response.status === "success") {
            localStorage.setItem(this.TOKEN_KEY, response.data.token);
            localStorage.setItem(
              this.USER_KEY,
              JSON.stringify(response.data.user)
            );
            this.isLoggedIn.set(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): { username: string; role: string } | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedInSignal() {
    return this.isLoggedIn;
  }
}
