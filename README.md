# Employees Hierarchy

### Contents

- [Description](#description)
  - [Technologies used](#technologies-used)
  - [Responsiveness](#responsiveness)
- [Context](#context)
- [Instructions](#instructions)
  - [How to install and run](#How-to-install-and-run-the-server-and-the-client)
  - [Jest tests instructions](#jest-tests-instructions)
- [Architecture](#architecture-mvc)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Opportunities of improvement](#opportunities-of-improvement)

---

## Description

This application represents employee data in a hierarchical form. The input employee data is stored on a JavaScript object.

### Technologies used:

🧰 Programming Language

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

🧰 Frameworks/Libraries

![](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

For testing purposes I've decided to use Jest.

### Responsiveness:

Although this application only renders a table in the client, It is fully responsive. It adapts to any screen size.

---

## Context:

- The core customer problem to solve in this project is to allow users to see a hierarchical structure of employees of a certain company.

- _React_ was the chosen JavaScript library for building the user interface (Front-End) as declarative views make code more predictable and easier to debug. It is powered by _Nextjs 14_.

- _Express_ was the chosen _Node.js_ framework for the Back-End as it quickly allows to build a TypeScript backend structure.

- The Back-End takes care of most of the logic, including the development of the data structure that contains the employees with hiearchical information. The fron-end uses this data to render the informat as per the requirements.

- _TailwindCSS_ (powered by _DaisyUI_), is the CSS framework layout and stylings.

---

## Instructions

### How to install and run the server and the client:

1. Clone this repository.

2. Install all dependencies for the development server. From the root directory, run:

```
npm install
```

3. To run the server, run from the root directory:

```
npm run dev
```
It will run the server on port 8888

4. Install all dependencies for the development server. From the root directory, run:
```
npm install --prefix client
```

5. To run the client, run from the root directory:

```
npm run dev --prefix client
```
It will run the server on port 7777

### Jest tests instructions:

- To run tests from the server, run on the root directory:
```
npm run test
```
- To run tests from the client, run on the root directory:
```
npm run test --prefix client
```
- There are snapshot tests implemented. In order to update snapshots, run from the root directory:
```
npm run test:updateSnapshot
```
- Test files are located in both the root (server) and the client directories. Look for __tests__.

---

## Architecture

### Backend:

- The _Express_ server handles the logic of the app.
- The _routes_ are stored in `src/api/v1/route.ts`
- `EmployeeHandler` handles most of the business logic and it transforms the input data into the hierarchical employee information sent to the frontend, it's stored in `src/api/v1/employees/employee-handler.ts`
- The input file that contains the employee details (not yet hierarchised) is called `employees-data.ts` located at the root directory.

### Frontend:

- The app was built using Nextjs `App router`. That means, the homepage is located on the `client/app/page.tsx`. `page` is a routable component. The components parent-child structure is the following:

```
OrganisationChart.tsx
  |
  |-->Table.tsx
  |     |
  |     |-->TableRow.tsx
  |
  |-->Spinner.tsx
```

- The `<OrganisationChart/>` component can access the _Express API routes_ and pass props that contain the hirarchical employee information to the `<Table/>`.

---

## Opportunities for improvement

- Add a caching system since the employee information isn't likely to change frequency.

- Add a database, which might improve the manipulation of data as the number of employees increases.

- Use a centralised state management: thinking about scalability, having state management such as useContext, or Redux could be helpful as it manages states in a single place.

Thank you for your time!