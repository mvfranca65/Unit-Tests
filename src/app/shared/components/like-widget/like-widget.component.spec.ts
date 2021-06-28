import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from "./like-widget.module";

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    //Configura o modulo do component
    await TestBed.configureTestingModule({
      // declarations: [LikeWidgetComponent],
      // providers: [UniqueIdService],
      // imports: [FontAwesomeModule],
      // -- OU --
      imports: [LikeWidgetModule]
    }).compileComponents();

    //Cria o component para teste e retorna um fixture (embrulho com component /ou casca)
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    // const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit (@Input id) is not assigned', () => {
    // const component = fixture.componentInstance;
    fixture.detectChanges(); //Dispara o ngOnInit
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    // const component = fixture.componentInstance;
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, done => {
    fixture.detectChanges();
    //Dispara o evento do @Output liked
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      //É usado para sinalizar que o teste terminou
      done();
    });
    component.like();
  });

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called V2`, () => {
    //É um recurso que roda por trás e você 'configura' o evento
    spyOn(component.liked, 'emit');
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });


});

