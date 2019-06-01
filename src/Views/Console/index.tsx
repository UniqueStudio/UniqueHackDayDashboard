import * as React from 'react';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import Status from '../../Components/Status';
import TeamInfo from '../../Components/TeamInfo';
import HackdayProgress from '../../Components/HackdayProgress';
import { RootState } from '../../redux/reducers';
import * as TYPE from '../../redux/actions';

class Console extends React.Component<{
    userIsAccepted: boolean | null;
    abortCompetition: any;
    inWaitList: boolean;
    checkedIn: boolean;
    toEditTeam: () => void;
    submitCheckIn: () => void;
}> {
    renderDivider() {
        return <div style={{ height: '20px' }} />;
    }

    render() {
        const { userIsAccepted, inWaitList, checkedIn } = this.props;
        let icon = { type: 'question', color: '#ffaf40' };
        let statusText = '等待审核';

        if (userIsAccepted === true) {
            statusText = '已通过';
            icon = { type: 'check', color: '#44B800' };
        } else if (userIsAccepted === false) {
            statusText = '未通过';
            icon = { type: 'close', color: '#f5222d' };
        } else if (inWaitList) {
            statusText = '等待列表';
        }

        if (checkedIn) {
            statusText += '已确认参赛';
        }

        return (
            <div style={{ paddingBottom: '40px' }}>
                <Status icon={icon} statusText={statusText} buttons={this.renderStatusButtons()} />
                {this.renderDivider()}
                <TeamInfo />
                {this.renderDivider()}
                <HackdayProgress />
            </div>
        );
    }

    renderStatusButtons() {
        const { userIsAccepted, checkedIn } = this.props;

        const buttonArrs = [
            <Button key={0} type="primary" onClick={this.props.toEditTeam}>
                组队
            </Button>,
        ];

        if (userIsAccepted && !checkedIn && new Date().getTime() >= 1559404799000) {
            buttonArrs.push(
                <Button key={1} type="danger" onClick={this.props.submitCheckIn}>
                    确认参赛
                </Button>,
            );
        }

        return buttonArrs;
    }
}

const mapStateToProps = ({ user }: RootState) => {
    const { isAccepted, inWaitList, checkedIn } = user;

    return {
        userIsAccepted: isAccepted,
        inWaitList,
        checkedIn,
    };
};

export default connect(
    mapStateToProps,
    dispatch => ({
        abortCompetition() {
            dispatch({ type: TYPE.ABORT_CONFIRM_SUBMIT._ });
        },
        toEditTeam() {
            dispatch(replace('/team'));
        },
        submitCheckIn() {
            dispatch({ type: TYPE.CHECK_IN_SUBMIT._ });
        },
    }),
)(Console);
