import { AfterViewInit, Component, Renderer2 } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from "@angular/common/http";

declare const $: any;
declare const moment: any;

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
          render: function (data: string) {
            const waktu = moment(data + " UTC");
            const html =
              waktu.local().format("YYYY-MM-DD") + "<br />" + waktu.local().format("HH:mm") + " WIB";
            return html;
          },
        },
        {
          targets: 1,
          render: function (data: string) {
            const html =
              "<img src='" + data + "' style='filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7));' />";
            return html;
          },
        },
        {
          targets: 2,
          render: function (data: string) {
            const array = data.split("||");
            const cuaca = array[0];
            const description = array[1];
            const html = "<strong>" + cuaca + "</strong> <br />" + description;
            return html;
          },
        },
      ],
    });

    this.getData("Pontianak"); // Menampilkan data cuaca Jakarta pertama kali
  }

  // Fungsi untuk menangani input enter pada field kota
  handleEnter(event: any): void {
    const cityName = event.target.value; // Ambil nama kota dari input
    if (cityName.trim() !== "") {
      this.getData(cityName); // Panggil fungsi untuk mengambil data cuaca berdasarkan nama kota
    }
  }

  getData(city: string): void {
    const apiKey = "68366bfa9cc8e29a19f9305151fe5b51"; // Pastikan menggunakan API key yang valid
    const cityId = 1630789; // Jika menggunakan ID kota Jakarta, gunakan ID ini

    // Memanggil API cuaca berdasarkan nama kota
    this.http
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .subscribe(
        (data: any) => {
          let list = data.list;
          console.log(list); // Untuk memeriksa apakah data sudah diterima dengan benar

          this.table1.clear(); // Bersihkan tabel sebelum menambahkan data baru

          list.forEach((element: any) => {
            const weather = element.weather[0];
            const iconUrl = "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
            const cuacaDeskripsi = weather.main + "|| " + weather.description;

            const main = element.main;
            const tempMin = this.kelvinToCelcius(main.temp_min); // Mengonversi suhu ke Celcius
            const tempMax = this.kelvinToCelcius(main.temp_max); // Mengonversi suhu ke Celcius
            const temp = tempMin + "°C - " + tempMax + "°C"; // Menampilkan suhu dalam rentang

            const row = [element.dt_txt, iconUrl, cuacaDeskripsi, temp]; // Menambahkan data ke dalam baris tabel

            this.table1.row.add(row); // Menambahkan baris ke dalam tabel
          });

          this.table1.draw(false); // Menggambar ulang tabel setelah data ditambahkan
        },
        (error: any) => {
          console.error("API Error:", error); // Menampilkan error di konsol
          alert("Error: " + (error.error?.message || "Unknown error")); // Menampilkan pesan error
          this.table1.clear(); // Bersihkan tabel jika terjadi error
          this.table1.draw(false); // Menggambar ulang tabel kosong
        }
      );
  }

  kelvinToCelcius(kelvin: any): any {
    let celcius = kelvin - 273.15;
    celcius = Math.round(celcius * 100) / 100; // Pembulatan suhu
    return celcius;
  }
}
