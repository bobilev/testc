import { hot } from 'react-hot-loader/root';
import '@vkontakte/vkui/dist/vkui.css';
import React, { Component } from "react";
import {View, Panel, PanelHeader, Group, List, Cell, ConfigProvider, Root, HeaderButton,platform, IOS} from '@vkontakte/vkui';
import vkConnect from '@vkontakte/vk-connect';
import CellButton from "@vkontakte/vkui/dist/components/CellButton/CellButton";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
// import '../styles/app.css';

vkConnect.send("VKWebAppInit", {})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeView: 'view1',
            activePanel: "panel1",
            history: ['main']
        }
    }

    render() {
        const osname = platform();
        return (
            <Root activeView={this.state.activeView}>
                <View activePanel="panel1.1" id="view1">
                    <Panel id="panel1.1">
                        <PanelHeader>View 1</PanelHeader>
                        <Group>
                            <CellButton onClick={ () => this.setState({ activeView: 'view2' }) }>
                                Open View 2
                            </CellButton>
                        </Group>
                    </Panel>
                </View>
                <View header activePanel={this.state.activePanel} id="view2">
                    <Panel id="panel1">
                        <PanelHeader
                            left={
                                <HeaderButton onClick={ () => this.setState({ activeView: 'view1' }) }>
                                    {osname === IOS ? "Отмена" : <Icon24Cancel/>}
                                </HeaderButton>
                            }
                        >View 2</PanelHeader>
                        <Group>
                            <CellButton onClick={ () => this.setState({ activeView: 'view1' }) }>
                                Back to View 1
                            </CellButton>
                            <CellButton onClick={ () => this.setState({ activePanel: 'panel2' }) }>
                                Go to panel 2
                            </CellButton>
                        </Group>
                    </Panel>
                    <Panel id="panel2">
                        <PanelHeader
                            left={
                                <HeaderButton onClick={ () => this.setState({ activePanel: 'panel1' }) }>
                                    {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                                </HeaderButton>
                            }
                        >Panel 2</PanelHeader>
                        <Group>
                            <CellButton stopPropagation={true} onClick={ () => this.setState({ activePanel: 'panel3' }) }>
                                Go to panel 3
                            </CellButton>
                        </Group>
                    </Panel>
                    <Panel id="panel3">
                        <PanelHeader
                            addon={<HeaderButton onClick={ () => this.setState({ activePanel: 'panel2' }) }>Назад</HeaderButton>}
                            left={
                                <HeaderButton onClick={ () => this.setState({ activePanel: 'panel2' }) }>
                                    {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                                </HeaderButton>
                            }
                        >Panel 3</PanelHeader>
                        <Group>
                            <CellButton onClick={ () => this.setState({ activePanel: 'panel1' }) }>
                                Back to panel 1
                            </CellButton>
                        </Group>
                    </Panel>
                </View>
            </Root>
        )
    }
}
export default hot(App)