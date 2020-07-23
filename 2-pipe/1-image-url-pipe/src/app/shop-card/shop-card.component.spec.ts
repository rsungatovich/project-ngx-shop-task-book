import { ImgUrlPipe } from '../pipe/img-url.pipe';
import { productData } from './../../../../../1-components/3-category-product-card/src/mocks/mock-product';
import { ShopCardComponent } from './shop-card.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('[Moдуль 2]  Url пайп', () => {
  let fixture: ComponentFixture<ShopCardComponent>;
  let component: ShopCardComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCardComponent, ImgUrlPipe],
    });
    fixture = TestBed.createComponent(ShopCardComponent);
    component = fixture.componentInstance;
    (component as any).product = productData;
    (component as any).product.count = 4;
    fixture.detectChanges();
  });

  it('компонент должен иметь метод decrementProductInCart ', () => {
    expect((component as any).decrementProductInCart).toBeTruthy();
  });
  it('компонент должен иметь метод removeProductFromCart', () => {
    expect((component as any).removeProductFromCart).toBeTruthy();
  });
  it('компонент должен иметь метод incrementProductInCart', () => {
    expect((component as any).incrementProductInCart).toBeTruthy();
  });
  it('компонент должен иметь свойство product', () => {
    expect((component as any).product).toBeTruthy();
  });

  it('тег с селектором .product-desc должен правильно интерполировать title', () => {
    const prodNameEL = fixture.debugElement.query(By.css('.product-desc'));
    expect(prodNameEL).toBeTruthy();
    const [{ nativeNode: prodNameNode }] = prodNameEL.childNodes;
    expect(prodNameNode.textContent.trim()).toEqual(
      (component as any)?.product.name
    );
  });

  it('тег img должен иметь правильное связывание свойств src через пайп и alt', () => {
    const imgWrapEl = fixture.debugElement.query(By.css('.product-img'));
    expect(imgWrapEl).toBeTruthy();
    const {
      images: [{ url }],
      name,
    } = (component as any)?.product;
    const [{ nativeNode: imgNode }] = imgWrapEl.childNodes;
    expect(imgNode.attributes.src.textContent).toEqual(url);
    expect(imgNode.attributes.alt.textContent).toEqual(name);
  });
  it('тег с селектором .price-text должен правильно интерполировать price', () => {
    const { price, count } = (component as any)?.product;
    const priceEl = fixture.debugElement.query(By.css('.price'));
    expect(priceEl).toBeTruthy();
    const [{ nativeNode: priceNode }] = priceEl.childNodes;
    const priceFromNode = Number(priceNode.textContent.trim().slice(0, 3));
    expect(price * count).toEqual(priceFromNode);
  });
});
