import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Cookies from "js-cookie";
import {BookingService} from "../service/BookingService";

function CountdownClock() {
    const navigate = useNavigate()
    const [countdownTime, setCountdownTime] = useState(5 * 60);
    const handleCountdown = async () => {
        const idBooking = Cookies.get("idBooking");
        try {
            const res = BookingService.removeBooking(idBooking);
        } catch (err) {
            console.log(err);
        }
        Cookies.remove("idBooking");
        navigate(`/list-product/1`);
        swal({
            title: "Thông báo",
            text: "Vui lòng thanh toán trong thời gian !",
            type: "error",
            icon: "error",
            button: {
                text: "OK",
            },
        });
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdownTime > 0) {
                setCountdownTime(prevTime => prevTime - 1);
            }
        }, 1000);
        if (countdownTime === 0) {
            handleCountdown()
        }

        return () => clearInterval(timer);
    }, [countdownTime]);

    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    return (
        <div>
            <span style={{ color: "red", fontSize: "1rem" }}>Vui lòng thanh toán trong : {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
        </div>
    );
}

export default CountdownClock;