import React from 'react';

const ThemeSwitcher = () => {
    const onChangeHandler = ({ target=null }) => {
        const rootEl = document.getElementById('root');

        target?.checked ?
            rootEl.setAttribute('theme', 'dark-theme') :
            rootEl.removeAttribute('theme');
    }
    return (
        <label className="switch">
            <input
                type="checkbox"
                onChange={onChangeHandler}
            />
                <span className="slider round"></span>
        </label>
    )
}

export default ThemeSwitcher;