## Storybook Usage Instructions By Herlan Mustopa

This project uses **Storybook** to technical test in Makyo Co. And this documentations about step by step you can install and running this project.

---

### **1. Installing Storybook**

If Storybook is not already installed in your project, you can add it by running:

```bash
npx storybook@latest init
```

This command will:
- Configure Storybook for your project.
- Add the necessary dependencies and scripts to your `package.json`.

---

### **2. Running Storybook**

To start the Storybook development server, run:

```bash
npm run storybook
```

Once started, Storybook will open automatically in your default browser. If it doesn’t, you can manually access it at:

```
http://localhost:6006
```

---

### **3. Component Stories**

The stories for the `Form` component are located in:

```bash
src/components/Form.stories.tsx
```

### **4. Interacting with the Component**

In Storybook:
1. Navigate to the `Form` component story under the **Form** section.
2. Use the **Controls** panel to dynamically adjust props like:
   - **`label`**: Customize the label text.
   - **`multiple`**: Enable or disable multiple selection.
   - **`outlined`**: Toggle the outlined style.
   - **`withSearch`**: Enable or disable the search bar.
3. Interact with the dropdown and observe the real-time changes.

---

### **5. Adding More Stories**

You can add additional variations of the `Form` component to test specific scenarios.

#### **Without Search Example**
```tsx
export const WithoutSearch = Template.bind({});
WithoutSearch.args = {
    label: "Label",
    options: [
        { label: "🍌", value: "banana" },
        { label: "🍎", value: "apple" },
        { label: "🍓", value: "strawbery" },
      ],
  withSearch: false,
};

```

---

### **6. Building Storybook for Deployment**

To build Storybook for production deployment, run:

```bash
npm run build-storybook
```

This will generate a `storybook-static` folder in your project root. You can deploy this folder to any static hosting platform like **Vercel**, **Netlify**, or **GitHub Pages**.

---

### **7. Troubleshooting**

If you encounter issues:
- **Storybook doesn’t start**: Ensure all required dependencies are installed.
- **Component doesn’t render**: Check that your story file is correctly named (`*.stories.tsx`) and your component is properly imported.
- **Props don’t update**: Ensure `argTypes` are defined correctly in your story.

---

Now you’re ready to use Storybook to test and explore your `Form` component! If you have any questions or need further assistance, feel free to reach out. 🚀
