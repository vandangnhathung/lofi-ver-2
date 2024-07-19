// src/components/MenuButton.stories.tsx

import React from 'react';
import {Meta, StoryFn} from '@storybook/react';
import MenuButton, {MenuButtonProps} from './MenuButton';
import {Home} from 'lucide-react';

export default {
    title: 'Components/MenuButton',
    component: MenuButton,
    argTypes: {
        onClick: {action: 'clicked'},
        IconComponent: {control: false},
    },
} as Meta;

const Template: StoryFn<MenuButtonProps> = (args) => <MenuButton {...args} />;

export const HomeButton = Template.bind({});
HomeButton.args = {
    IconComponent: Home,
    backgroundColor: 'black',
};
