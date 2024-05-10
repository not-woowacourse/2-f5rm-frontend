import dynamic from 'next/dynamic';

import { type ElementType } from 'react';

/**
 * @reference https://github.com/react-hook-form/devtools/issues/187#issuecomment-1369182795
 */
const HookFormDevTool__Csr: ElementType = dynamic(
  () =>
    import('@hookform/devtools').then((module) => {
      return module.DevTool;
    }),
  { ssr: false },
);

export { HookFormDevTool__Csr };
