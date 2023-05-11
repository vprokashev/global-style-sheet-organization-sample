CSS Modules + SASS
```
+ theme
- + 1.variables
- - z-index (dropdown, modal, tooltip, menu, notification, alert)
- - paths
- - colors (for css preprocessors)
- - shadows
- + 2.tools
- - button
- - grid
- - ellipsis
- - triangle
- - unselectable
- - placeholder
- - clearfix
- + 3.initials
- - reset-css
- - fonts
- - webkit-scroll
- - colors (for css var)
- 4.vendor
- 5.overlap (Complex selectors for multiple components. There are cases in css when this is justified. For example, when we use :hover in the parent component, and in the child we need to change the styles.)
- index (import in the same order)
```

Untested Tips:  
Divide into separate classes positioning and decoration  
todo: Create a table with all CSS properties divided into groups  
classes:  
  inner, content - width and height = 100% (static)  
  container - fixed size (relative, absolute, sticky, fixed)  
