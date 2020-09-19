## SPI operation

> [!Note]
> 1. Currently only **SV50PB module** supports this function.
> 2. Before use, you need to enable the **SPI** function in the [module configuration](https://superv.flythings.cn) and upgrade with the generated new system package before it can be used normally.
> 3. More about the module [Using Tutorial](core_module.md)。

### Introduce header files

  ```c++
  #include "utils/SpiHelper.h"
  ```

### Specific operation

  ```c++
  // Required header files
  #include "utils/SpiHelper.h"

  static void testSpi() {
	uint8_t tx[512], rx[512];

	/**
	 * Define variables
	 *
	 * Parameter 1: SPI bus number
	 * Parameter 2: Mode, optional values: SPI_MODE_0, SPI_MODE_1, SPI_MODE 2, SPI_MODE_3
	 * Parameter 3: SPI clock frequency, 50M is set here
	 * Parameter 4: How many bits does a word have, default value: 8
	 * Parameter 5: Bit order, true: means low bit first, false: means high bit first; default value: false, high bit first
	 */
	SpiHelper spi(1, SPI_MODE_0, 50*1000*1000, 8, false);

	memset(tx, 0, 512);
	memset(rx, 0, 512);

	tx[0] = 0x4B;

	/**
	 * Simplex write
	 *
	 * Parameter 1: Write data address
	 * Parameter 2: Data length
	 */
	if (!spi.write(tx, 5)) {
		LOGD("spi tx error!\n");
	}

	/**
	 * Simplex read
	 *
	 * Parameter 1: Read data address
	 * Parameter 2: Data length
	 */
	if (!spi.read(rx, 8)) {
		LOGD("spi rx error!\n");
	}

	for (int i = 0; i < 8; i++) {
		LOGD("spi[%d]=0x%x\n", i, rx[i]);
	}

	/**
	 * Half-duplex transmission
	 *
	 * Parameter 1: Write data address
	 * Parameter 2: Write data length
	 * Parameter 3: Read data address
	 * Parameter 4: Read data length
	 */
	if (!spi.halfduplexTransfer(tx, 5, rx, 8)) {
		LOGD("spi spi_halfduplex_transfer rx error!\n");
	}

	for (int i = 0; i < 8; i++) {
		LOGD("spi[%d]=0x%x\n", i, rx[i]);
	}
  }
  ```

For other interface operations, please refer to the header file notes.
