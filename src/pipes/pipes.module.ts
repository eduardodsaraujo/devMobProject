import { NgModule } from '@angular/core';
import { KeysPipe } from './keys/keys';
import { SumPricesProductsPipe } from './sum-prices-products/sum-prices-products';
import { TruncatePipe } from './truncate/truncate';
@NgModule({
	declarations: [KeysPipe,
    SumPricesProductsPipe,
    TruncatePipe],
	imports: [],
	exports: [KeysPipe,
    SumPricesProductsPipe,
    TruncatePipe]
})
export class PipesModule {}
