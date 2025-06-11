import React, { useRef } from 'react';
import { DatePicker, Space, theme } from 'antd';
import './Calendario.css'; // Acá importás el CSS personalizado

const Calendario = ({ onChange }) => {
    const containerRef = useRef(null);
    const { token } = theme.useToken();

    const style = {
        border: `1px solid ${token.colorPrimary}`,
        borderRadius: '50%',
    };

    const cellRender = (current, info) => {
        if (info.type !== 'date') {
            return info.originNode;
        }
        return (
            <div className="ant-picker-cell-inner" >
                {current.date()}
            </div>
        );
    };

    return (
        <div ref={containerRef} className="antd-dark-calendar border border-gray-700 shadow-lg">
            <Space size={12} direction="vertical">
                <DatePicker.RangePicker
                onChange={onChange}
                cellRender={cellRender}
                getPopupContainer={() => containerRef.current}
                allowClear={false}
                placeholder={['', '']}
                open={true}
                popupClassName="shadow-lg border border-gray-700 rounded-xl bg-neutral-900"
                style={{
                    opacity: 0,
                    position: 'absolute',
                    pointerEvents: 'none',
                    width: 0,
                    height: 0,
                    margin: 0,
                    padding: 0,
                    border: 'none',
                }}
                />
            </Space>
        </div>
    );
};

export default Calendario;
