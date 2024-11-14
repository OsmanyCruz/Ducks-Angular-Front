# Documentación del Proyecto - Random Ducks API

#### Este proyecto consiste en una página web desarrollada con Angular que consume una API backend para mostrar imágenes de patos aleatorios o filtradas por número. La aplicación cuenta con una interfaz limpia y responsiva, implementando buenas prácticas de arquitectura y diseño.

## Tabla de Contenidos
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Servicios](#servicios)
- [Componentes](#componentes)
- [Estilos y Responsividad](#estilos-y-responsividad)
- [Ejecución](#ejecución)



## Requisitos previos

- Node.js: Asegúrate de tener instalada una versión compatible (recomendado v14 o superior).
- Angular CLI: Para la creación y ejecución de proyectos Angular.
- Backend: El servidor backend debe estar funcionando para que la aplicación pueda consumir la API.

## Instalación

1. Clonar el Repositorio:
~~~
git clone https://github.com/OsmanyCruz/Ducks-Angular-Front.git
cd Ducks-Angular-Front 
~~~

2. Instalar Dependencias:
~~~
npm install
~~~

3. Ejecutar la Aplicación: Inicia el servidor de desarrollo:
~~~
ng serve
~~~

3. Abrir el Navegador y Accede a la aplicación desde:
~~~
http://localhost:4200
~~~

## Estructura del Proyecto
~~~
src/
├── app/
│   ├── components/              
│   │   ├── duck-gallery/                                            
│   ├── services/                
│   │   └── duck.service.ts           
├── environments
│   └── environment.ts
│   ├── app-routes.ts                  
angular.json                     
package.json                     
README.md                        
~~~

## Servicios
### **DuckService** (`duck.service.ts`)
#### Este servicio se encarga de interactuar con el backend para obtener la lista de patos aleatorios y filtrados por número. Usa HttpClient para realizar las solicitudes HTTP.
**Métodos**
1. `getRandomImage()`: Obtiene una imagen aleatoria.
2. `getImagesByNumber(number: number)`: Obtiene todas las imágenes asociadas a un número.
~~~
@Injectable({
  providedIn: 'root'
})
export class DuckService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getRandomImage(): Observable<{ url: string }> {
      var response = this.http.get<{ url: string }>(`${this.apiUrl}/random`).pipe(
        catchError((error) => {
          const errorResult = error.status === 500 ? error.error.error : error.message;
          return throwError(() => new Error(`Api Error: ${errorResult}`));
        })
      );
      return response;
  }

  getImagesByNumber(number: number): Observable<{ urls: string[] }> {
      var response = this.http.get<{ urls: string[] }>(`${this.apiUrl}/${number}`).pipe(
        catchError((error) => {
          console.log(error);
          const errorResult = error.status === 500 ? error.error.error : error.message;
          return throwError(() => new Error(`Api Error: ${errorResult}`));
        })
      );
      return response;
  }
}
~~~

## Componentes
### Componente de Entrada y Botón (`duck-gallery.component.ts`)
**Propiedades y Métodos**
  - `imageUrls`: Contiene el valor obtenido en un conjunto de imagenes
  - `randomImage`: Contiene una unica imagen random
  - `errorMessageGenerateRandomImage`: Contiene un mensaje en caso de error al generear la immagen random
  - `errorMessageFetchImagesByNumber`: Contiene un mensaje en caso de error al generear el conjunto de imagenes

  ~~~

  @Component({
  selector: 'app-duck-gallery',
  standalone: true, 
  templateUrl: './duck-gallery.component.html',
  styleUrls: ['./duck-gallery.component.scss'],
  imports: [CommonModule] 
})
export class DuckGalleryComponent {
  imageUrls: string[] = [];
  randomImage: string | null = null;
  errorMessageGenerateRandomImage: string | null = null;
  errorMessageFetchImagesByNumber: string | null = null;

  constructor(private duckService: DuckService) {}
 

  fetchImages(number: number) {
    this.generateRandomImage();
    this.fetchImagesByNumber(number);
  }

  generateRandomImage() {
      this.duckService.getRandomImage().subscribe({
        next: (response) => {
          this.randomImage = response.url;
          this.errorMessageGenerateRandomImage = '';
        },
        error: (err) => {
          this.errorMessageGenerateRandomImage = err.message
          this.randomImage = null;
        },
      });
  }

  fetchImagesByNumber(number: number) {
      this.duckService.getImagesByNumber(number).subscribe({
        next: (response) => {
          this.imageUrls = response.urls;
          this.errorMessageFetchImagesByNumber = '';
        },
        error: (err) => {
          this.errorMessageFetchImagesByNumber = err.message
          this.imageUrls = [];
        },
      });
  }
 
}
  ~~~
## Estilos y Responsividad
#### El diseño de la aplicación es completamente responsivo, adaptándose tanto a dispositivos móviles como de escritorio. Utiliza boostrap para crear una disposición de imágenes flexible, y los componentes están estilizados para una experiencia de usuario óptima.

#### estilos extras
~~~
img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    img {
      width: 100px;
      height: 100px;
    }
  }
~~~


## Ejecución
1. Asegúrate de que el backend esté corriendo en http://localhost:3000. en caso de querer cambbiar la url del backend lo podra hacerr en el archivo `environment.ts`
2. Ejecuta el frontend con:
~~~
ng serve
~~~
3. Accede a la aplicación en `http://localhost:4200`