import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';


describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    // Crea un ActivatedRoute Mock
    const activatedRouteMock = {
      snapshot: {
        paramMap: convertToParamMap({}), 
      },
    };

  await TestBed.configureTestingModule({
    declarations: [RegistroPage],
    imports: [
      IonicModule.forRoot(),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
    ],
    providers: [
      UsuarioStorageService,
      { provide: Storage, useClass: Storage },
      { provide: ActivatedRoute, useValue: activatedRouteMock },  
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(RegistroPage);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

it('1.1 Creación del componente registro', () => {
  expect(component).toBeTruthy();
});
/*--------------------RUT--------------------*/
it('2.1 Rut Invalido (sin formato) ', () => {
  const pruebaRut = component.usuario?.get('rut');
  pruebaRut?.setValue('22606024-5');
  expect(pruebaRut?.invalid).toBeTruthy();
});

it('2.2 Rut Invalido (vacio)', () => {
  const pruebaRut = component.usuario?.get('rut');
  pruebaRut?.setValue('');
  expect(pruebaRut?.invalid).toBeTruthy();
});

it('2.3 Rut Valido (con formato)', () => {
  const pruebaRut = component.usuario?.get('rut');
  pruebaRut?.setValue('22.606.024-3');
  expect(pruebaRut?.valid).toBeTruthy();
});
/*--------------------NOMBRE--------------------*/
it('3.1 Nombre Invalido Vacio', () => {
  const pruebaNombre = component.usuario?.get('nombre');
  pruebaNombre?.setValue('');
  expect(pruebaNombre?.invalid).toBeTruthy();
});

it('3.2 Nombre Invalido (valores insuficientes)', () => {
  const pruebaNombre = component.usuario?.get('nombre');
  pruebaNombre?.setValue('a');
  expect(pruebaNombre?.invalid).toBeTruthy();
});

it('3.3 Nombre Valido', () => {
  const pruebaNombre = component.usuario?.get('nombre');
  pruebaNombre?.setValue('ManJuaLia');
  expect(pruebaNombre?.valid).toBeTruthy();
});
/*--------------------APELLIDO--------------------*/
it('4.1 Apellido Paterno Invalido (Vacio)', () => {
  const pruebaApP = component.usuario?.get('ap_paterno');
  pruebaApP?.setValue(''); 
  expect(pruebaApP?.invalid).toBeTruthy();
});

it('4.2 Apellido Paterno Invalido (un solo digito)', () => {
  const pruebaApP = component.usuario?.get('ap_paterno');
  pruebaApP?.setValue('a');
  expect(pruebaApP?.invalid).toBeTruthy();
});

it('4.3 Apellido Paterno Valido', () => {
  const pruebaApP = component.usuario?.get('ap_paterno');
  pruebaApP?.setValue('MiquelInosLe');
  expect(pruebaApP?.valid).toBeTruthy();
});
/*--------------------FECHA NACIMIENTO--------------------*/
it('5.1 Fecha Registro valida', () => {
  const fechaActual = new Date();
  const fechaIngresada = new Date('1999-12-25');
  const fechaValida = !isNaN(fechaIngresada.getTime()) && fechaIngresada <= fechaActual;
  expect(fechaValida).toBeTrue();
});

it('5.2 Fecha Registro Invalida', () => {
  const fechaActual = new Date();
  const fechaIngresada = new Date('2030-04-29');
  const fechaValida = !isNaN(fechaIngresada.getTime()) && fechaIngresada <= fechaActual;
  expect(fechaValida).toBeFalsy();
});
/*--------------------CORREO--------------------*/
it('6.1 Correo Valido', () => {
  const pruebaEmail = component.usuario?.get('email');
  pruebaEmail?.setValue('peakyblinder@duoc.cl'); 
  expect(pruebaEmail?.valid).toBeTruthy();
});

it('6.2 Correo Invalido (vacio)', () => {
  const pruebaEmail = component.usuario?.get('email');
  pruebaEmail?.setValue(''); 
  expect(pruebaEmail?.invalid).toBeTruthy();
});

it('6.3 Correo Invalido (Sin formato Email)', () => {
  const pruebaEmail = component.usuario?.get('email');
  pruebaEmail?.setValue('peakyblinderduoc.cl'); 
  expect(pruebaEmail?.invalid).toBeTruthy();
});

/*--------------------contrasena--------------------*/
it('7.1 contrasena Invalida 1 (sin validacion)', () => {
  const pruebacontrasena = component.usuario?.get('contrasena');
  pruebacontrasena?.setValue('asdas');
  expect(pruebacontrasena?.invalid).toBeTruthy();
});

it('7.2 contrasena Valida', () => {
  const pruebacontrasena = component.usuario?.get('contrasena');
  pruebacontrasena?.setValue('Judas123'); 
  expect(pruebacontrasena?.valid).toBeTruthy();
});

it('7.3 contrasenas Iguales Validas', () => {
  const pruebacontrasena = component.usuario?.get('contrasena');
  const pruebacontrasena2 = component.usuario?.get('contrasena2');
  pruebacontrasena?.setValue('Judas123');
  pruebacontrasena2?.setValue('Judas123');
  var validar = pruebacontrasena?.value === pruebacontrasena2?.value
  expect(validar).toBeTruthy();
});

it('7.4 contrasenas diferentes Invalidas', () => {
  const pruebacontrasena = component.usuario?.get('contrasena');
  const pruebacontrasena2 = component.usuario?.get('contrasena2');
  pruebacontrasena?.setValue('Judas123');
  pruebacontrasena2?.setValue('jujudas123');
  var validar = pruebacontrasena?.value != pruebacontrasena2?.value
  expect(validar).toBeTruthy();

  it('1.1 Creación del componente registro', () => {
    expect(component).toBeTruthy();
  });
  
  /*--------------------CODIGO ASIGNATURA--------------------*/
  it('2.1 Codigo Asignatura Invalido (digitos insuficientes) ', () => {
    const pruebaCodigo = component.asignatura.get('codigo')
    pruebaCodigo?.setValue('1');
    expect(pruebaCodigo?.invalid).toBeTruthy();
  });

  it('2.2 Codigo Asignatura Invalido (Vacio) ', () => {
    const pruebaCodigo = component.asignatura.get('codigo')
    pruebaCodigo?.setValue('');
    expect(pruebaCodigo?.invalid).toBeTruthy();
  });

  it('2.3 Codigo Asignatura Valido ', () => {
    const pruebaCodigo = component.asignatura.get('codigo')
    pruebaCodigo?.setValue('PGY2131');
    expect(pruebaCodigo?.valid).toBeTruthy();
  });
  
  /*--------------------NOMBRE ASIGNATURA--------------------*/
  it('3.1 Nombre Asignatura Invalido (digitos insuficientes) ', () => {
    const pruebaNombre = component.asignatura.get('nombre_asig')
    pruebaNombre?.setValue('le');
    expect(pruebaNombre?.invalid).toBeTruthy();
  });

  it('3.2 Nombre Asignatura Valido', () => {
    const pruebaNombre = component.asignatura.get('nombre_asig')
    pruebaNombre?.setValue('Programación de Aplicaciones Móviles');
    expect(pruebaNombre?.valid).toBeTruthy();
  });

  /*--------------------RUT--------------------*/
  it('4.1 Rut Invalido (sin formato) ', () => {
    const pruebaRut = component.asignatura?.get('Rut_Docente');
    pruebaRut?.setValue('22606024-5');
    expect(pruebaRut?.invalid).toBeTruthy();
  });

  it('4.2 Rut Invalido (vacio)', () => {
    const pruebaRut = component.asignatura?.get('Rut_Docente');
    pruebaRut?.setValue('');
    expect(pruebaRut?.invalid).toBeTruthy();
  });

  it('4.3 Rut Valido (con formato)', () => {
    const pruebaRut = component.asignatura?.get('Rut_Docente');
    pruebaRut?.setValue('22.606.024-3');
    expect(pruebaRut?.valid).toBeTruthy();
  });

});
});
