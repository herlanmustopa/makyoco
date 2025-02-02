import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import {Form} from "./Form";

export default {
  title: "Form",
  component: Form,
  argTypes: {
    multiple: {
        control: "boolean"
    },
    withSearch: {
        control: "boolean"
    },
    outlined: {
        control: "boolean"
    }
  },
//   decorators: []
} as Meta<typeof Form>;

const Template: StoryFn<typeof Form> = (args) => <Form {...args} />;

export const SelectDropdownField = Template.bind({});
SelectDropdownField.args = {
  label: "Label",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option with icon", value: "optionwithicon" },
    { label: "Long Long Option 3", value: "option3" },
    { label: "Long Long Long Option 4", value: "option4" },
    { label: "Long Long Long Long Option 5", value: "option5" },
    { label: "Long Long Long Long Long Option 6", value: "option6" },
  ],
  multiple: false,
  withSearch: true,
  outlined: false
};
