import * as React from 'react';

type NextImageMockProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

const NextImageMock = React.forwardRef<HTMLImageElement, NextImageMockProps>(function NextImageMock(
  { src, alt = '', fill, priority: _priority, style, ...props },
  ref,
) {
  return (
    <img
      ref={ref}
      src={typeof src === 'string' ? src : src?.toString()}
      alt={alt}
      style={
        fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              ...style,
            }
          : style
      }
      {...props}
    />
  );
});

export default NextImageMock;
