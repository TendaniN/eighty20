import styled from "styled-components";

export const Loaders = styled.div`
  /* PAGE LOADER */
  .loader {
    width: 40px;
    aspect-ratio: 1;
    --c: linear-gradient(var(--color-blue-800) 0 0);
    --r1: radial-gradient(
      farthest-side at bottom,
      var(--color-blue-800) 93%,
      var(--color-blue-800)
    );
    --r2: radial-gradient(
      farthest-side at top,
      var(--color-blue-800) 93%,
      var(--color-blue-800)
    );
    background: var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2),
      var(--c), var(--r1), var(--r2);
    background-repeat: no-repeat;
    animation: l1 1s infinite alternate;
    margin: 20% 45%;
  }

  @keyframes l1 {
    0%,
    10% {
      background-size: 8px 0, 8px 4px, 8px 4px;
      background-position: 0 50%, 0 calc(50% - 2px), 0 calc(50% + 2px), 50% 50%,
        50% calc(50% - 2px), 50% calc(50% + 2px), 100% 50%, 100% calc(50% - 2px),
        100% calc(50% + 2px);
    }
    90%,
    100% {
      background-size: 8px 100%, 8px 4px, 8px 4px;
      background-position: 0 50%, 0 -2px, 0 calc(100% + 2px), 50% 50%, 50% -2px,
        50% calc(100% + 2px), 100% 50%, 100% -2px, 100% calc(100% + 2px);
    }
  }

  /* COMPONENT LOADER */
  .lds-spinner {
    color: var(--color-blue-900);
  }
  .lds-spinner,
  .lds-spinner div,
  .lds-spinner div:after {
    box-sizing: border-box;
  }
  .lds-spinner {
    color: var(--color-blue-700);
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 20% 45%;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3.2px;
    left: 36.8px;
    width: 6.4px;
    height: 17.6px;
    border-radius: 20%;
    background: var(--color-blue-400);
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  /* SITE LOADER */

  .lds-facebook {
    color: #1c4c5b;

    margin: 10% 45%;
  }
  .lds-facebook,
  .lds-facebook div {
    box-sizing: border-box;
  }
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 160px;
    height: 200px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 32px;
    border-radius: var(--border-radius-medium);
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
    background: var(--color-blue-900);
  }
  .lds-facebook div:nth-child(2) {
    left: 56px;
    animation-delay: -0.12s;
    background: var(--color-blue-400);
  }
  .lds-facebook div:nth-child(3) {
    left: 108px;
    animation-delay: 0s;
    background: var(--color-blue-400);
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 178px;
    }
    50%,
    100% {
      top: 24px;
      height: 89px;
    }
  }

  @media (max-width: 48rem) {
    width: 100vw;
    padding: 3rem;

    .lds-spinner,
    .loader,
    .lds-facebook {
      margin: 20%;
    }
  }
`;
