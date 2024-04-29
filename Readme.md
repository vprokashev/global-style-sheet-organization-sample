CSS Modules + SASS
```
+ theme
- + core (may be imported to each project file https://github.com/vprokashev/my-dev-env/blob/main/src/get-rules.js#L4)
- - + 1.variables
- - - z-index (dropdown, modal, tooltip, menu, notification, alert)
- - - paths
- - - colors (for css preprocessors)
- - - shadows
- - + 2.tools
- - - grid
- - - ellipsis
- - - triangle
- - - unselectable
- - - placeholder
- - - clearfix
- - + 3 component mixins
- - - + inline (uncommon) inline or inline-block
- - - - text var 1
- - - - text var 2
- - - + block (regular) only block
- - - - button
- - - + container (uncommon) all except inline or inline-block
- - - index (import in the same order)
- + 4.initials
- - reset-css
- - fonts
- - webkit-scroll
- - colors (for css var)
- 5.vendor
- 6.overlap (Complex selectors for multiple components. There are cases in css when this is justified. For example, when we use :hover in the parent component, and in the child we need to change the styles.) Special data-attr
- index (import in the same order)
```

