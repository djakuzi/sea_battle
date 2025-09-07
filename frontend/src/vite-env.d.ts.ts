//default
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png' {
  const classes: string;
  export default classes;
}

declare module '*.jpg' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const classes: string;
  export default classes;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.mp3' {
  const classes: { [key: string]: string };
  export default classes;
}
