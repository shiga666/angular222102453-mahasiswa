import { AfterViewInit, Component, Renderer2 } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import dayjs from "dayjs"; // Menggunakan dayjs untuk menggantikan moment.js

declare const $: any;

@Component({
  selector: "app-cuaca",
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterModule],
  templateUrl: "./cuaca.component.html",
  styleUrl: "./cuaca.component.css",
})
export class CuacaComponent implements AfterViewInit {
  private table1: any;

  constructor(
    private renderer: Renderer2,
    private http: HttpClient
  ) {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
  }

  ngAfterViewInit(): void {
    this.table1 = $("#table1").DataTable({
      columnDefs: [
        {
          targets: 0,
          render: (data: string) => {
            const waktu = dayjs(data + " UTC");
            return `${waktu.format("YYYY-MM-DD")}<br />${waktu.format("HH:mm")} WIB`;
          },
        },
        {
          targets: 1,
          render: (data: string) => {
            return `<img src='${data}' style='filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7));' alt='Weather Icon' />`;
          },
        },
        {
          targets: 2,
          render: (data: string) => {
            const [cuaca, description] = data.split("||");
            return `<strong>${cuaca}</strong><br />${description}`;
          },
        },
      ],
    });

    this.getData("Pontianak"); // Menampilkan data cuaca untuk kota Pontianak pertama kali
  }

  handleEnter(event: any): void {
    const cityName = event.target.value.trim();
    if (!cityName) {
      alert("Nama kota tidak boleh kosong.");
      return;
    }
    this.getData(cityName); // Panggil fungsi untuk mengambil data cuaca berdasarkan nama kota
  }

  getData(city: string): void {
    const apiKey = "0514d5633f370c75af91828308c153fc"; // Pastikan menggunakan API key yang valid
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    this.http.get<WeatherResponse>(apiUrl).pipe(
      catchError(this.handleError)
    ).subscribe({
      next: (data) => this.processWeatherData(data),
      error: (err) => console.error("Error fetching weather data:", err),
    });
  }

  private processWeatherData(data: WeatherResponse): void {
    const list = data.list;
    if (!list || list.length === 0) {
      alert("Tidak ada data cuaca yang ditemukan.");
      return;
    }

    this.table1.clear();

    list.forEach((element) => {
      const weather = element.weather[0];
      const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
      const cuacaDeskripsi = `${weather.main}||${weather.description}`;

      const main = element.main;
      const tempMin = this.kelvinToCelsius(main.temp_min);
      const tempMax = this.kelvinToCelsius(main.temp_max);
      const temp = `${tempMin}°C - ${tempMax}°C`;

      const row = [element.dt_txt, iconUrl, cuacaDeskripsi, temp];
      this.table1.row.add(row);
    });

    this.table1.draw(false);
  }

  private kelvinToCelsius(kelvin: number): number {
    return Math.round((kelvin - 273.15) * 100) / 100;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = "Terjadi kesalahan, coba lagi nanti.";
    if (error.status === 404) {
      errorMessage = "Kota tidak ditemukan.";
    } else if (error.status === 401) {
      errorMessage = "API Key tidak valid.";
    }
    alert(errorMessage);
    return new Observable(); // Kembalikan observable kosong
  }
}

interface WeatherResponse {
  list: WeatherElement[];
}

interface WeatherElement {
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}
