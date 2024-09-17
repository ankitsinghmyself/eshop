# Next.js Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
npm install
npm install @prisma/client

### Prisma

1. Initialize Prisma:
    ```bash
    npx prisma init
    ```

2. Generate Prisma client:
    ```bash
    npx prisma generate
    ```

3. Create and apply your initial migration:
    ```bash
    npx prisma migrate dev --name initial-migration
    ```

4. Seed the database:
    ```bash
    npm run seed
    ```

### Material-UI (MUI) 5

This project uses Material-UI (MUI) 5. To start using MUI in your project, ensure you have installed the necessary packages and followed the MUI setup instructions.

### Charts

The project uses `react-chartjs-2` and `chart.js` for charting. Ensure you have these dependencies installed.

### Development Server

To run the development server, use one of the following commands:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

You can start editing the page by modifying `app/page.tsx`. The page will auto-update as you make changes.

### Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, explore the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

Check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) to contribute and provide feedback.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), created by the team behind Next.js.

For more details on deployment, refer to our [Next.js deployment documentation](https://nextjs.org/docs/deployment).
