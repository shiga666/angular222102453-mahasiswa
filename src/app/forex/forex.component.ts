import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

declare const $ : any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './forex.component.html',
  styleUrl: './forex.component.css'
})
export class ForexComponent implements AfterViewInit{
  private_table1 : any;

  constructor(private renderer: Renderer2, private httpclient: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapsed");

    this.private_table1 = $("#table1").DataTable({
      "columnDefs" : [
        {
          "targets" : 3,
          "className" : "text-right"
        }
      ]
    });

    this.bindTable1();
  }
  
  bindTable1(): void {
    console.log("bindTable1()");
  
    // URL to fetch exchange rates
    const ratesUrl = "https://openexchangerates.org/api/latest.json?app_id=2a6ab820ceab4750b50a026f6b183a74";
    // URL to fetch currency names
    const currenciesUrl = "https://openexchangerates.org/api/currencies.json";
  
    // Fetch the currency names
    this.httpclient.get(currenciesUrl).subscribe((currencies: any) => {
      // Fetch the exchange rates
      this.httpclient.get(ratesUrl).subscribe((data: any) => {
        const rates = data.rates;
        const timestamp = data.timestamp; // Get the timestamp from the API response
        console.log(rates);
  
        // Convert the timestamp to a human-readable format
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds
        const formattedDate = date.toLocaleString(); // Converts to local date/time format
  
        // Display the timestamp in the HTML element
        const timestampElement = document.getElementById("rate-timestamp");
        if (timestampElement) {
          timestampElement.innerHTML = `Last updated: ${formattedDate}`;
        }
  
        let index = 1;
  
        // Iterate over the rates and add the rows to the table
        for (const currency in rates) {
          // Get the currency name from the API
          const currencyName = currencies[currency];
  
          // Calculate the rate for the specific currency
          const rate = rates.IDR / rates[currency];
          const formatRate = formatCurrency(rate, "en-US", "", currency);
  
          console.log(`${currency}: ${currencyName} - ${formatRate}`);
  
          // Add the row with the index, symbol, currency name, and formatted rate
          const row = [index++, currency, currencyName, formatRate];
          this.private_table1.row.add(row);
  
          this.private_table1.draw(false);
        }
      });
    });
  }  
}