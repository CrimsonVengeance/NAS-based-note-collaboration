# Maven Spring Boot Back-End and React Front-End Template
A Full-Stack template using a **Spring Boot** Back-End and a **React** Front-End that is installed and unit tested using Vite, integrated into a single Maven-managed project.

## Usage
The Template can be used in two ways:
### Development
To run the Application in dev mode with hot-fixes enabled, you will need to run the Spring Boot and React servers concurrently, using these two commands in seperate command terminals in sequence:
#### 1. Run the Back-End (Spring Boot)
You must be at the root of the project directory for this:

```bash
mvn spring-boot:run
```
The Back-End will start on `http://localhost:8081`.
#### 2. Run the Front-End (React + Vite)
To run the React frontend from the command line, you must navigate to the frontend directory, then:

```bash
./npm run dev
```
The Front-End will open by default on `http://localhost:3000`.

### 3. Access the App
Navigate to **`http://localhost:3000`**. All requests to `/api/*` are automatically proxied to the Spring Boot Back-End.
### Production
This is where the power of maven and Vite come in handy. All you need to do to get a packaged JAR executable is navigate to the project root and run:

```
mvn install
```

This JAR contains all of your projects production code, and can be ran as-is. Neat, right?
## Project Structure
For reference, any label in the structure with a / at the end is a folder.

```
Maven-React-Spring-Boot-Template
├── pom.xml                                         # Root Maven configuration
├── README.md                                       # The file you are reading right now, remove/replace at your leisure.
└── src/
    ├── main/
    │   ├── frontend/
    │   │   ├── dist/
    │   │   ├── index.html
    │   │   ├── npm
    │   │   ├── package.json
    │   │   ├── public
    │   │   ├── src/
    │   │   └── vite.config.js
    │   ├── backend/
    │   └── resources
    │       ├── application.properties
    │       └── static
    └── test/
        ├── frontend/                               # This directory contains all of the test files for the Front-End.
        │   ├── frontend -> ../../main/frontend/        # Allows the frontend test files to access the main files. Temporary until I find a better method.
        ├── backend/                                # This directory containts all of the test files for the Back-End.
        └── resources/
```
## Template Details
Now to get down to the nitty gritty, and explain how this all works, and why I made this template in the first place.

#### **Why was this made?**
I made this template for three main reasons:
- 1. React and Spring Boot do not have the same project structure, with Spring boot following the src/main/java structure and React having a src/ structure, therefore cluttering and making a mess of the end result.
- 2. The other templates I have found that fix problem #1 do not implement unit testing, or if they do they don't share it with the rest of the class.
- 3. Being able to leverage Maven drastically simplifies both the containerization of projects, and streamline the production, CI/CD pipeline.

Maven is also a wonderful structure to simplify this project due to the plugins, like the frontend-maven-plugin, which allows React to run off a local npm installation, reducing the "It works great on MY machine" problem drastically. The exec-maven-plugin ensures that the project can cleanly compile and build the React Front-End, removing the need to manually compile it every time it it packaged for production.

#### **How does this work/ How can it be modified to work for me?**
First, we need to take a look at the Pom.xml, as that is where we initialize the project to create the file structure, install the local npm, and streamline the npm compilation and build process.

##### **Pom.xml**
For any project, you are going to need to change the project's groupId, artifactId, and version:

```bash
15 <groupId>org.example</groupId>
16 <artifactId>your-new-artifactId</artifactId>
17 <version>0.0-SNAPSHOT</version>
```
To change the Spring Boot entry point, we navigate to build->plugins->spring-boot-maven-plugin, which looks like this:

```bash
41 <plugin>
42    <groupId>org.springframework.boot</groupId>
43    <artifactId>spring-boot-maven-plugin</artifactId>
44    <configuration>
45        <mainClass>com.example.demo.DemoApplication</mainClass>
46    </configuration>
47 </plugin>
```
To change the entry point to another package/class, you replace the entry inside configuration-> mainClass to a new package and/or class:

```bash
41 <plugin>
42    <groupId>org.springframework.boot</groupId>
43    <artifactId>spring-boot-maven-plugin</artifactId>
44    <configuration>
45        <mainClass>com.example.someOtherModule.SomeOtherEntryPoint</mainClass>
46    </configuration>
47 </plugin>
```

##### **Front-End Configuration**
To modify the React Configuration, you need to look at `src/main/frontend/vite.config.js`:

This is where the proxy connection to the backend is located, if the Spring Boot server's address or port needs to be changed, you do that here.

## Key Technologies
- **Backend:** Spring Boot
- **Frontend:** React, Vite
- **Integration:** Maven

## References
These are all the websites that I (remembered that I) used to synthesize my template, they were close to what I wanted, but they didn't quite work the way I hoped they would, which resulted in this template.

**https://medium.com/codex/run-react-frontend-and-springboot-backend-on-the-same-port-and-package-them-as-a-single-artifact-a790c9e10ac1**

**https://github.com/RamyaSingavarapu/maven-react-template/tree/master**:
This one is fantastic and was my main inspiration, but it doesnt involve unit testing, which is not acceptable.
