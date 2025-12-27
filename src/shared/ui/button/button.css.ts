import { recipe } from '@vanilla-extract/recipes';

export const buttonStyles = recipe({
  base: {
    borderRadius: '0.6rem',
    border: 'none',
    cursor: 'pointer',
    // todo: theme 세팅 이후 폰트 관련, 컬러 관련 수정 필요
  },
  variants: {
    display: {
      block: {
        display: 'block',
      },
      inline: {
        display: 'inline-block',
        width: 'auto',
      },
      full: {
        display: 'block',
        width: '100%',
      },
    },
    size: {
      large: {
        padding: '1.3rem 0',
        fontSize: '1.8rem',
        fontWeight: 'bold',
      },
      medium: {
        padding: '0.9rem 0',
        fontSize: '1.4rem',
      },
    },
    variant: {
      primary: {
        backgroundColor: '#E7FF7E',
        color: 'black',
        selectors: {
          '&:active': {
            backgroundColor: '#DDF575',
          },
        },
      },
      black: {
        backgroundColor: 'black',
        color: 'white',
      },
      white: {
        backgroundColor: 'white',
        color: 'black',
      },
      gray: {
        backgroundColor: '#D9D9D9',
        color: 'white',
      },
    },
    stroke: {
      medium: {
        border: '0.1rem solid black',
      },
      large: {
        border: '0.2rem solid black',
      },
    },
  },
  defaultVariants: {
    display: 'full',
    size: 'large',
    variant: 'primary',
  },
});
