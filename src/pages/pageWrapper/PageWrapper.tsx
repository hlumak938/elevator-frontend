import { ReactElement, ReactNode } from 'react';
import './PageWrapper.scss';

type PageWrapperProps = {
    title?: string;
    children: ReactNode;
    button?: ReactElement;
}

const PageWrapper = ({ children, title, button }: PageWrapperProps) => (
  <>
    <div className="PageHeader">
      {
        title && (
          <h2 className="PageTitle">
            {title}
          </h2>
        )
      }
      {button && <div className="PageButton">{button}</div>}
    </div>

    <div className="PageWrapper">
      {children}
    </div>
  </>
);

export default PageWrapper;
