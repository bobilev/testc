import { hot } from 'react-hot-loader/root';
import '@vkontakte/vkui/dist/vkui.css';
import React, { Component } from "react";
import {View, Panel, PanelHeader, Group, List, Cell, ConfigProvider, Root, HeaderButton,platform, IOS} from '@vkontakte/vkui';
import connect from '@vkontakte/vk-connect';
import qrvk from '@vkontakte/vk-qr'
import CellButton from "@vkontakte/vkui/dist/components/CellButton/CellButton";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
// import '../styles/app.css';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeView: 'view1',
            activePanel: "panel1",
            history: ['main'],
            QRcode : "",
            QRcodeRes: ""
        }
    }
    componentDidMount() {
        connect.send("VKWebAppInit", {})

        connect.subscribe((e) => {
            console.log("e",e)
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    break;
                case 'VKWebAppAccessTokenReceived':
                    break;
                case 'VKWebAppGetPhoneNumber':
                    break;
                case 'VKWebAppOpenQRResult':
                    console.log("QR",e.detail)
                    this.setState(() => {
                        return {QRcodeRes: e.detail.data.qr_data}
                    })
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
        // connect.send("VKWebAppGetPhoneNumber", {});

        const text = 'https://vk.com/evgbobilev';
        const isShowVkLogo = true;
        const qrSvg = qrvk.createQR(text, 256, 'qr-code-class', isShowVkLogo);
        this.setState(() => {
            return {QRcode:qrSvg}
        })
        // connect.send('VKWebAppGetAuthToken', {'app_id': 6906999, 'scope': 'market'});
    }
    onOpenQRcamera = () => {
        connect.send("VKWebAppOpenQR");
    }
    render() {
        let { QRcode,QRcodeRes } = this.state
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
                            <div className="qr_code" dangerouslySetInnerHTML={{ __html: QRcode }}></div>
                            <Button onClick={this.onOpenQRcamera}>
                                Сканировать QR-код
                            </Button>
                            <div>
                                QRcodeRes:{QRcodeRes}
                            </div>
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