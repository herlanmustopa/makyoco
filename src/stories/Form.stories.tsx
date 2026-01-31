import type { Meta, StoryFn } from "@storybook/react";
import { Form } from "./Form";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Form",
  component: Form,
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed beside the dropdown",
    },
    multiple: {
      control: "boolean",
      description: "Enable multi-select mode",
    },
    withSearch: {
      control: "boolean",
      description: "Show search input inside dropdown",
    },
    outlined: {
      control: "boolean",
      description: "Use outlined style variant",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when nothing is selected",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          padding: "40px",
          background: "#f9f9f9",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta<typeof Form>;

const Template: StoryFn<typeof Form> = (args) => <Form {...args} />;

const defaultOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Long Option Name 4", value: "option4" },
  { label: "Very Long Option Name 5", value: "option5" },
  { label: "Extra Long Option Name 6", value: "option6" },
];

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
  { label: "Mango", value: "mango" },
  { label: "Orange", value: "orange" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Watermelon", value: "watermelon" },
];

const countryOptions = [
  { label: "Indonesia", value: "id" },
  { label: "Malaysia", value: "my" },
  { label: "Singapore", value: "sg" },
  { label: "Thailand", value: "th" },
  { label: "Vietnam", value: "vn" },
  { label: "Philippines", value: "ph" },
  { label: "Japan", value: "jp" },
  { label: "South Korea", value: "kr" },
];

// === Default / Single Select ===
export const Default = Template.bind({});
Default.args = {
  label: "Select Item",
  options: defaultOptions,
  multiple: false,
  withSearch: true,
  outlined: false,
  onChange: action("onChange"),
};

// === Multi Select ===
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  label: "Select Fruits",
  options: fruitOptions,
  multiple: true,
  withSearch: true,
  outlined: false,
  onChange: action("onChange"),
};

// === Without Search ===
export const WithoutSearch = Template.bind({});
WithoutSearch.args = {
  label: "Country",
  options: countryOptions,
  multiple: false,
  withSearch: false,
  outlined: false,
  onChange: action("onChange"),
};

// === Outlined Style ===
export const Outlined = Template.bind({});
Outlined.args = {
  label: "Category",
  options: defaultOptions,
  multiple: false,
  withSearch: true,
  outlined: true,
  onChange: action("onChange"),
};

// === Multi Select Outlined ===
export const MultiSelectOutlined = Template.bind({});
MultiSelectOutlined.args = {
  label: "Tags",
  options: fruitOptions,
  multiple: true,
  withSearch: true,
  outlined: true,
  onChange: action("onChange"),
};

// === Custom Placeholder ===
export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  label: "Country",
  options: countryOptions,
  multiple: false,
  withSearch: true,
  outlined: false,
  placeholder: "Choose a country...",
  onChange: action("onChange"),
};

// === Many Options (scrollable) ===
export const ManyOptions = Template.bind({});
ManyOptions.args = {
  label: "Select",
  options: [
    ...fruitOptions,
    ...countryOptions,
    { label: "Extra Item 1", value: "extra1" },
    { label: "Extra Item 2", value: "extra2" },
    { label: "Extra Item 3", value: "extra3" },
  ],
  multiple: false,
  withSearch: true,
  outlined: false,
  onChange: action("onChange"),
};
