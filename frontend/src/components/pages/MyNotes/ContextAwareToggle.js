import { useContext } from "react";
import { useAccordionButton, AccordionContext } from "react-bootstrap";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  return (
    <div type="button" style={{}} onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

export default ContextAwareToggle;
