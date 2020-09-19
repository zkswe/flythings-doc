# Hardware instructions
## Precautions before use
1. Make sure the power supply voltage must be 4.5-5.5V. If the power supply exceeds or falls below this range, the machine cannot work normally. If the power supply voltage is too high, the module screen will be damaged.
2. Determine whether the serial port level is RS232 or TTL or RS485, and choose according to the requirements in conjunction with the fourth point.
3. Pay attention to the interface definition instructions of the power interface socket, and do not connect it wrongly.

## Module function interface diagram
* ### z11s
  ![](https://ae01.alicdn.com/kf/HTB1osCxNxjaK1RjSZFA762dLFXa1.png)
* ### z6s  
  ![](https://ae01.alicdn.com/kf/HTB1nWaJNyLaK1RjSZFx761mPFXaM.png) 
  
## Power interface description
* ### PH2.0-8PIN seat interface definition

   | 1PIN | 2PIN |3PIN | 4PIN | 5PIN | 6PIN | 7PIN | 8PIN |
| --- | --- | --- | --- |--- | --- |--- | --- |
| DC5V | RESET | CTS | TXOUT/B | RXIN/A | RTS | GND | GND |  
|DC power input 4.5-5.5V |Module RESET, the default is NC |Flow control CTS |Serial TX or RS485-B. (Connect to external equipment RX/RS485B) |Serial RX or RS485-A (connect to external equipment TX/RS485A) | Flow control RTS| Power ground | Power ground | 

<br/>
*  ### 10PIN1.0FPC socket interface definition  

    | 1/2/3PIN | 4PIN | 5PIN | 6PIN | 7PIN | 8/9/10PIN | 
    | --- | --- | --- | --- |--- | --- |
    | DC5V | RTS | RXIN/A | TXOUT/B | CTS | GND |
    |DC power input 4.5-5.5V | Flow control RTS | Serial port RX or RS485-A (connect to external device TX/RS485A) | Serial port TX or RS485-B. (Connect to external equipment RX/RS485B) | Flow control CTS | Power ground | 
    
    
    
## Serial output mode selection
As illustrated  
0R resistance is TTL, 0R is not RS232.

 ![](https://ae01.alicdn.com/kf/HTB15NSoNzTpK1RjSZKP7613UpXat.png) 
 
## The module screen corresponds to the external device interface diagram

 ![](https://ae01.alicdn.com/kf/HTB1KimmNxTpK1RjSZFK7612wXXaZ.png) 

## Sample distribution power cord description
 
 The power cord is a white-blue or white-red cord with a single-ended PH2.0-8PIN 10CM buckle. As shown    
 
  ![](https://ae01.alicdn.com/kf/HTB1.xrlau3tHKVjSZSg7604QFXaV.png)   
  ![](https://ae01.alicdn.com/kf/HTB13RdNNCzqK1RjSZPc762TepXav.png) 