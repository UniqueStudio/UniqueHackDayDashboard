# Unique Hackday Dashboard

[![Build Status](https://travis-ci.org/farawaaay/UniqueHackDayDashboard.svg?branch=master)](https://travis-ci.org/farawaaay/UniqueHackDayDashboard)
 
> This dashboard is designed to be reuseable. we will use this dashboard for few years.

## Architecture

The latest ant-design, react, redux and redux-saga were used in this project.

In `src` directory, there are `Components`, `Layouts` and `Views`.

`Components` are dumb components which only render JSX accroding to its props.

`Layouts` are also dumb components which use `Components` as its children to
represent the layout.

`Views` are components connected to the redux store.

## Build Tools

I use parcel-bundler as the packager in this project.
Parcel is easy to use and fast.
