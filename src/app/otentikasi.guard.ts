import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// Guard untuk otentikasi
export const otentikasiGuard: CanActivateFn = (route, state) => {
  console.log("Otentikasi dimulai");

  // Mengambil nilai 'userId' dari cookie
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const userId = cookieService.get("userId");
  console.log("userId: " + userId);

  // Cek apakah userId tidak ada, undefined, atau kosong
  if (userId === null || userId === "undefined" || userId === "") {
    console.log("Pengguna belum login.");
    // Jika belum login, arahkan ke halaman login
    router.navigate(["/login"]);  
    return false;  // Menyatakan bahwa akses tidak diizinkan
  }

  // Jika userId ada, berarti pengguna sudah login
  console.log("Pengguna sudah login.");

  // Jika perlu logout pada suatu kondisi, misalnya saat pengguna mengakses URL tertentu, lakukan ini:
  if (state.url === '/logout') {  // Misalnya halaman logout khusus
    console.log("Pengguna melakukan logout.");
    cookieService.delete("userId");  // Hapus cookie
    router.navigate(["/login"]);  // Redirect ke halaman login
    return false;  // Menyatakan bahwa akses tidak diizinkan, karena logout
  }

  return true;  // Izinkan akses ke halaman yang dilindungi
};
