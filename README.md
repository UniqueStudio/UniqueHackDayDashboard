# Unique Hackday Dashboard

[![Build Status](https://travis-ci.org/UniqueStudio/UniqueHackDayDashboard.svg?branch=master)](https://travis-ci.org/UniqueStudio/UniqueHackDayDashboard)

> This dashboard is designed to be reuseable. we will use this dashboard for few years.

## Architecture

The latest ant-design, react, redux and redux-saga were used in this project.

In `src` directory, there are `Components`, `Layouts` and `Views`.

`Components` are dumb components which only render JSX accroding to its props.

`Layouts` are also dumb components which use `Components` as its children to
represent the layout.

`Views` are components connected to the redux store.

## Principles

1.  All side-effects must be handled by redux-saga middleware.
2.  Actions can be handled by reducers, must be handled by reducers.
3.  Typecheck and lint must be passed without warning before commit.

## Build Tools

Use parcel-bundler as the packager in this project.
Parcel is easy to use and fast.

## Author

Frontend:

* [fareaway](https://github.com/farawaaay)

* [LLGZONE](https://github.com/LLGZONE)

Backend:

* [NekodRider](https://github.com/NekodRider)
* [ver217](https://github.com/ver217)

PM && Designer

* [fredliang44](https://github.com/fredliang44)
