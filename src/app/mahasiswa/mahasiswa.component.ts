import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [RouterModule,HeaderComponent,SidebarComponent,FooterComponent],
  templateUrl: './mahasiswa.component.html',
  styleUrl: './mahasiswa.component.css'
})
export class MahasiswaComponent implements AfterViewInit{
  data: any;
  table1: any;
  
  constructor (private httpClient: HttpClient, private renderer:Renderer2){}

  ngAfterViewInit(): void{
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapse");
    this.table1 = $("#table1").DataTable();

    this.bindMahasiswa();
  }
  bindMahasiswa(): void {
    this.httpClient.get("https://stmikpontianak.cloud/011100862/tampilMahasiswa.php").subscribe((data: any) => {
      console.log(data);
  
      this.table1.clear();
  
      data.forEach((element: any) => {
        const tempatTanggalLahir = element.TempatLahir + ", " + element.TanggalLahir;
  
        // Menambahkan ikon berdasarkan jenis kelamin
        const jenisKelaminIcon =
          element.JenisKelamin === "Laki-Laki"
            ? '<i class="fa fa-mars text-primary"></i> Laki-Laki'
            : element.JenisKelamin === "Perempuan"
            ? '<i class="fa fa-venus text-pink"></i> Perempuan'
            : '<i class="fa fa-question-circle text-secondary"></i> Tidak Diketahui';
  
        const row = [
          element.NIM,
          element.Nama,
          jenisKelaminIcon, // Tambahkan dengan ikon
          tempatTanggalLahir,
          element.JP,
          element.Alamat,
          element.StatusNikah,
          element.TahunMasuk,
        ];
  
        this.table1.row.add(row);
      });
  
      this.table1.draw(false);
    });
  }
  
  showTambahModal(): void {
    $("#tambahModal").modal();
  }
  postRecord(): void {
    var alamat = $("#alamatText").val();
    var jeniskelamin = $("#jeniskelaminSelect").val(); // Pastikan ini mengambil nilai yang benar
    var jp = $("#jpSelect").val();
    var nama = $("#namaText").val();
    var nim = $("#nimText").val();
    var statusNikah = $("#statusNikahSelect").val();
    var tahunMasuk = $("#tahunMasukText").val();
    var tanggalLahir = $("#tanggalLahirText").val();
    var tempatLahir = $("#tempatLahirText").val();
  
    // Validasi untuk Jenis Kelamin
    if (!jeniskelamin) {
      alert("Jenis kelamin belum diisi");
      return;
    }
    // Validasi untuk input lainnya
    if (nim.length == 0) {
      alert("NIM belum diisi");
      return;
    }
    if (nama.length == 0) {
      alert("Nama belum diisi");
      return;
    }
    if (tempatLahir.length == 0) {
      alert("Tempat lahir belum diisi");
      return;
    }
    if (alamat.length == 0) {
      alert("Alamat belum diisi");
      return;
    }
    if (tahunMasuk.length == 0) {
      alert("Tahun masuk belum diisi");
      return;
    }
  
    // Encode data sebelum mengirim
    alamat = encodeURIComponent(alamat);
    jeniskelamin = encodeURIComponent(jeniskelamin);
    jp = encodeURIComponent(jp);
    nama = encodeURIComponent(nama);
    nim = encodeURIComponent(nim);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    tanggalLahir = encodeURIComponent(tanggalLahir);
    tempatLahir = encodeURIComponent(tempatLahir);
  
    var url = "https://stmikpontianak.cloud/011100862/tambahMahasiswa.php" +
      "?alamat=" + alamat +
      "&jenisKelamin=" + jeniskelamin +
      "&jp=" + jp +
      "&nama=" + nama +
      "&nim=" + nim +
      "&statusPernikahan=" + statusNikah +
      "&tahunMasuk=" + tahunMasuk +
      "&tanggalLahir=" + tanggalLahir +
      "&tempatLahir=" + tempatLahir;
  
    this.httpClient.get(url).subscribe(
      (data: any) => {
        console.log(data);
        alert(data.status + " --> " + data.message);
        this.bindMahasiswa();
        $("#tambahModal").modal("hide");
      },
      (error) => {
        console.error(error);
        alert("Terjadi kesalahan saat menambahkan data!");
      }
    );
  }
        
  }


