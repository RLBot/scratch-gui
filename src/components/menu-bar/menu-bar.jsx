import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import ProjectLoader from '../../containers/project-loader.jsx';
import Menu from '../../containers/menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import ProjectSaver from '../../containers/project-saver.jsx';
import debounce from 'lodash.debounce';

import {openTipsLibrary} from '../../reducers/modals';
import {
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen
} from '../../reducers/menus';

import styles from './menu-bar.css';
import inputStyles from '../forms/input.css';
import labelStyles from '../forms/label.css';
import buttonStyles from '../button/button.css';

import mystuffIcon from './icon--mystuff.png';
import feedbackIcon from './icon--feedback.svg';
import profileIcon from './icon--profile.png';
import communityIcon from './icon--see-community.svg';
import dropdownCaret from '../language-selector/dropdown-caret.svg';
import scratchLogo from './scratch-logo.svg';
import connectedIcon from './icon--connected.svg';
import errorIcon from './icon--error.svg';

import helpIcon from './icon--help.svg';

const MenuBarItemTooltip = ({
    children,
    className,
    id,
    place = 'bottom'
}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        place={place}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({id, children, className}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        place="right"
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string
};

const MenuBarMenu = ({
    children,
    onRequestClose,
    open,
    place = 'right'
}) => (
    <Menu
        className={styles.menu}
        open={open}
        place={place}
        onRequestClose={onRequestClose}
    >
        {children}
    </Menu>
);

MenuBarMenu.propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right'])
};



class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        let self = this;

        const urlParams = new URLSearchParams(window.location.search);
        const host = urlParams.get('host') || 'localhost';
        const players = urlParams.get('players');

        self.state = {
            isConnected: false, 
            hostInput: host, 
            p1: !players || players.indexOf(1) >= 0, 
            p2: !players || players.indexOf(2) >= 0,
            p3: !players || players.indexOf(3) >= 0,
            p4: !players || players.indexOf(4) >= 0
        };

        props.vm.runtime.rlbotManager.setHost(host);
        props.vm.runtime.rlbotManager.filterPlayer(0, self.state.p1);
        props.vm.runtime.rlbotManager.filterPlayer(1, self.state.p2);
        props.vm.runtime.rlbotManager.filterPlayer(2, self.state.p3);
        props.vm.runtime.rlbotManager.filterPlayer(3, self.state.p4);

        self.hostUpdater = debounce((evt) => { props.vm.runtime.rlbotManager.setHost(evt.target.value); }, 500);
    }

    componentDidMount() {
        let self = this;
        this.interval = setInterval(() => {
            self.setState({isConnected: self.props.vm.runtime.rlbotManager.hasConnection});
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        let props = this.props;
        let self = this;
        return (    

    <Box className={styles.menuBar}>
        <div className={styles.mainMenu}>
            <div className={styles.fileGroup}>
                <div className={classNames(styles.menuBarItem)}>
                    <img
                        alt="Scratch"
                        className={styles.scratchLogo}
                        draggable={false}
                        src={scratchLogo}
                    />
                </div>
                <div className={classNames(styles.menuBarItem, styles.hoverable)}>
                    <MenuBarItemTooltip
                        id="menubar-selector"
                        place="right"
                    >
                        <LanguageSelector />
                    </MenuBarItemTooltip>
                </div>
                <div
                    className={classNames(styles.menuBarItem, styles.hoverable, {
                        [styles.active]: props.fileMenuOpen
                    })}
                    onMouseUp={props.onClickFile}
                >
                    <div className={classNames(styles.fileMenu)}>
                        <FormattedMessage
                            defaultMessage="File"
                            description="Text for file dropdown menu"
                            id="gui.menuBar.file"
                        />
                    </div>
                    <MenuBarMenu
                        open={props.fileMenuOpen}
                        onRequestClose={props.onRequestCloseFile}
                    >
                        <MenuItemTooltip id="new">
                            <MenuItem>
                                <FormattedMessage
                                    defaultMessage="New"
                                    description="Menu bar item for creating a new project"
                                    id="gui.menuBar.new"
                                />
                            </MenuItem>
                        </MenuItemTooltip>
                        <MenuSection>
                            <MenuItemTooltip id="save">
                                <MenuItem>
                                    <FormattedMessage
                                        defaultMessage="Save now"
                                        description="Menu bar item for saving now"
                                        id="gui.menuBar.saveNow"
                                    />
                                </MenuItem>
                            </MenuItemTooltip>
                            <MenuItemTooltip id="copy">
                                <MenuItem>
                                    <FormattedMessage
                                        defaultMessage="Save as a copy"
                                        description="Menu bar item for saving as a copy"
                                        id="gui.menuBar.saveAsCopy"
                                    /></MenuItem>
                            </MenuItemTooltip>
                        </MenuSection>
                        <MenuSection>
                            <ProjectLoader>{(renderFileInput, loadProject, loadProps) => (
                                <MenuItem
                                    onClick={loadProject}
                                    {...loadProps}
                                >
                                    <FormattedMessage
                                        defaultMessage="Upload from your computer"
                                        description="Menu bar item for uploading a project from your computer"
                                        id="gui.menuBar.uploadFromComputer"
                                    />
                                    {renderFileInput()}
                                </MenuItem>
                            )}</ProjectLoader>
                            <ProjectSaver>{(saveProject, saveProps) => (
                                <MenuItem
                                    onClick={saveProject}
                                    {...saveProps}
                                >
                                    <FormattedMessage
                                        defaultMessage="Download to your computer"
                                        description="Menu bar item for downloading a project"
                                        id="gui.menuBar.downloadToComputer"
                                    />
                                </MenuItem>
                            )}</ProjectSaver>
                        </MenuSection>
                    </MenuBarMenu>
                </div>
                <div
                    className={classNames(styles.menuBarItem, styles.hoverable, {
                        [styles.active]: props.editMenuOpen
                    })}
                    onMouseUp={props.onClickEdit}
                >
                    <div className={classNames(styles.editMenu)}>
                        <FormattedMessage
                            defaultMessage="Edit"
                            description="Text for edit dropdown menu"
                            id="gui.menuBar.edit"
                        />
                    </div>
                    <MenuBarMenu
                        open={props.editMenuOpen}
                        onRequestClose={props.onRequestCloseEdit}
                    >
                        <MenuItemTooltip id="undo">
                            <MenuItem>
                                <FormattedMessage
                                    defaultMessage="Undo"
                                    description="Menu bar item for undoing"
                                    id="gui.menuBar.undo"
                                />
                            </MenuItem>
                        </MenuItemTooltip>
                        <MenuItemTooltip id="redo">
                            <MenuItem>
                                <FormattedMessage
                                    defaultMessage="Redo"
                                    description="Menu bar item for redoing"
                                    id="gui.menuBar.redo"
                                />
                            </MenuItem>
                        </MenuItemTooltip>
                        <MenuSection>
                            <MenuItemTooltip id="turbo">
                                <MenuItem>
                                    <FormattedMessage
                                        defaultMessage="Turbo mode"
                                        description="Menu bar item for toggling turbo mode"
                                        id="gui.menuBar.turboMode"
                                    />
                                </MenuItem>
                            </MenuItemTooltip>
                        </MenuSection>
                    </MenuBarMenu>
                </div>
            </div>
            <Divider className={classNames(styles.divider)} />
            <div className={classNames(styles.menuBarItem)}>
                <MenuBarItemTooltip id="title-field">
                    <input
                        disabled
                        className={classNames(styles.titleField)}
                        placeholder="Untitled-1"
                    />
                </MenuBarItemTooltip>
            </div>
            <div className={classNames(styles.menuBarItem)}>
                <MenuBarItemTooltip id="share-button">
                    <Button className={classNames(styles.shareButton)}>
                        <FormattedMessage
                            defaultMessage="Share"
                            description="Label for project share button"
                            id="gui.menuBar.share"
                        />
                    </Button>
                </MenuBarItemTooltip>
            </div>
            <div className={classNames(styles.menuBarItem, styles.communityButtonWrapper)}>
                <MenuBarItemTooltip id="community-button">
                    <Button
                        className={classNames(styles.communityButton)}
                        iconClassName={styles.communityButtonIcon}
                        iconSrc={communityIcon}
                    >
                        <FormattedMessage
                            defaultMessage="See Community"
                            description="Label for see community button"
                            id="gui.menuBar.seeCommunity"
                        />
                    </Button>
                </MenuBarItemTooltip>
            </div>
        </div>
        <div className={classNames(styles.menuBarItem, styles.feedbackButtonWrapper)}>
            <a
                className={styles.feedbackLink}
                href="https://scratch.mit.edu/discuss/topic/299791/"
                rel="noopener noreferrer"
                target="_blank"
            >
                <Button
                    className={styles.feedbackButton}
                    iconSrc={feedbackIcon}
                >
                    <FormattedMessage
                        defaultMessage="Give Feedback"
                        description="Label for feedback form modal button"
                        id="gui.menuBar.giveFeedback"
                    />
                </Button>
            </a>
        </div>
        <div className={classNames(styles.menuBarItem, styles.feedbackButtonWrapper)}>
            <label className={classNames(labelStyles.inputGroup)}>
                <span className={classNames(labelStyles.inputLabel)}>Host</span>
                <input className={classNames(inputStyles.inputForm)} type="text" value={this.state.hostInput}
                onChange={
                    (evt) => {
                        evt.persist();
                        self.setState({hostInput: evt.target.value})
                        self.hostUpdater(evt);
                    }
                } />
                <img
                    className={classNames(buttonStyles.icon)}
                    draggable={false}
                    src={self.state.isConnected ? connectedIcon : errorIcon}
                />
            </label>
        </div>
        <div className={classNames(styles.menuBarItem)}>
            <span className={classNames(labelStyles.inputLabel)}>Players</span>
            <label className={classNames(labelStyles.inputGroup)}>
                <span>p1</span>
                <input type="checkbox" defaultChecked={self.state.p1} 
                onChange={ (evt) => props.vm.runtime.rlbotManager.filterPlayer(0, evt.target.checked) } />
            </label>
            <label className={classNames(labelStyles.inputGroup)}>
                <span>p2</span>
                <input type="checkbox" defaultChecked={self.state.p2} 
                onChange={ (evt) => props.vm.runtime.rlbotManager.filterPlayer(1, evt.target.checked) } />
            </label>
            <label className={classNames(labelStyles.inputGroup)}>
                <span>p3</span>
                <input type="checkbox" defaultChecked={self.state.p3} 
                onChange={ (evt) => props.vm.runtime.rlbotManager.filterPlayer(2, evt.target.checked) } />
            </label>
            <label className={classNames(labelStyles.inputGroup)}>
                <span>p4</span>
                <input type="checkbox" defaultChecked={self.state.p4} 
                onChange={ (evt) => props.vm.runtime.rlbotManager.filterPlayer(3, evt.target.checked) } />
            </label>
        </div>
        <div className={styles.accountInfoWrapper}>
            <div
                aria-label="How-to Library"
                className={classNames(styles.menuBarItem, styles.hoverable)}
                onClick={props.onOpenTipLibrary}
            >
                <img
                    className={styles.helpIcon}
                    src={helpIcon}
                />
            </div>
            <MenuBarItemTooltip id="mystuff">
                <div
                    className={classNames(
                        styles.menuBarItem,
                        styles.hoverable,
                        styles.mystuffButton
                    )}
                >
                    <img
                        className={styles.mystuffIcon}
                        src={mystuffIcon}
                    />
                </div>
            </MenuBarItemTooltip>
            <MenuBarItemTooltip
                id="account-nav"
                place="left"
            >
                <div
                    className={classNames(
                        styles.menuBarItem,
                        styles.hoverable,
                        styles.accountNavMenu
                    )}
                >
                    <img
                        className={styles.profileIcon}
                        src={profileIcon}
                    />
                    <span>
                        {'scratch-cat' /* @todo username */}
                    </span>
                    <img
                        className={styles.dropdownCaretIcon}
                        src={dropdownCaret}
                    />
                </div>
            </MenuBarItemTooltip>
        </div>
    </Box>
    )};
}

MenuBar.propTypes = {
    editMenuOpen: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onOpenTipLibrary: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    fileMenuOpen: fileMenuOpen(state),
    editMenuOpen: editMenuOpen(state)
});

const mapDispatchToProps = dispatch => ({
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
