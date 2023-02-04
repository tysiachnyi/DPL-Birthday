# The DPL-Date Thing 

## DPL Trial Exercise (TypeScript)

This exercise is divided into multiple parts, solve at least the first. If you take on all tasks: **it's okay if parts are sketchy, as long a you put your effort into the frontend**.

**bonus** We are interested in documentation as well... so: a nice README.md and some inline documentation cannot hurt.

Impress us :)

## Frontend Part

Create an app that worries only about one thing, selecting the date of your birthday.

  - Create a **React+TypeScript+SCSS** application
  - Create a **Birthday** component (only component in the app)
    - **it must use** typescipt all the way
    - **it must** have 3 input fields for: day, month, year
    - **it must** help users to enter data (suggestions, dropdown)
    - **it must** validate input to be a **real date**
    - **it must** validate input to be **more than 18 years ago**
    - **it must** look awesome
    - **do not** use a library component, date-picker
    - **you may** use **@mui and co.** to build your component
    - **you may** use **moment** or another date-handling lib
    - **bonus** keyboard navigation
    - **bonus** use redux
    - **bonus** PWA+LocalStorage Persistence
    - **bonus** add confetti for a certain date (rick astley ;)

## Backend Part

### Either: Express Way
  - Create an express-based REST backend exposing:
    - a **GET /birthday** route
    - a **PUT /birthday** route
  - **bonus** use typescript
  - **must** persistent storage
  - integrate your frontend with the backend
    - that means: your frontend gets the saved birthday at load
      and saves the birthday for later 


### Or: Your Way
  - Create an backend exposing, use any language:
    - a **getBirthday** query
    - a **setBirthday** mutation
  - **must** persistent storage
  - integrate your frontend with the backend
    - that means: your frontend gets the saved birthday at load
      and saves the birthday for later 
