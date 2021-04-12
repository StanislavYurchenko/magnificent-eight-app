import PropTypes from 'prop-types';
import { StylesProvider } from '@material-ui/core/styles';
import LinkList from '../LinkList';

import {
  StyledCardMedia,
  StyledTypography,
  StyledCardContent,
  StyledParagraph,
  StyledAbout,
  StyledWrapper,
  Overlay,
} from './ContactCard.style.js';

const ContactCard = ({ photo, name, position, about, hubLink, linLink }) => {
  return (
    <StylesProvider injectFirst>
      <Overlay className="overlay">
        <LinkList hubLink={hubLink} linLink={linLink} />
      </Overlay>
      <StyledWrapper>
        <StyledCardMedia width="280" height="244" alt={name} src={photo} title={name} />
        <StyledCardContent>
          <StyledTypography color="textPrimary" component="p">
            {name}
          </StyledTypography>
          <StyledParagraph color="textPrimary" component="p">
            {position}
          </StyledParagraph>
          <StyledAbout color="textPrimary" component="p">
            {about}
          </StyledAbout>
        </StyledCardContent>
      </StyledWrapper>
    </StylesProvider>
  );
};

ContactCard.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  about: PropTypes.string,
  hubLink: PropTypes.string,
  linLink: PropTypes.string,
};

export default ContactCard;
