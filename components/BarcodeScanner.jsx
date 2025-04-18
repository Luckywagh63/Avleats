"use client";

import { useEffect, useRef } from "react";
import Quagga from "@ericblade/quagga2";

export default function BarcodeScanner({ onScan }) {
    const scannerRef = useRef(null);

    useEffect(() => {
        if (!scannerRef.current) return;

        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: { facingMode: "environment" },
                    target: scannerRef.current,
                },
                decoder: { readers: ["ean_reader", "code_128_reader"] },
            },
            (err) => {
                if (err) {
                    console.error("Error initializing Quagga:", err);
                    return;
                }
                Quagga.start();
            }
        );

        const handleDetected = (data) => {
            const scannedCode = data?.codeResult?.code;
            if (scannedCode) {
                onScan(scannedCode);
                Quagga.stop();
            }
        };

        Quagga.onDetected(handleDetected);

        return () => {
            Quagga.stop();
            Quagga.offDetected(handleDetected);
        };
    }, [onScan]);

    return <div ref={scannerRef} className="w-full h-40 bg-gray-200"></div>;
}