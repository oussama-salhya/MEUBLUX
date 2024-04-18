const msg = (verificationToken, email, origin) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito&family=Quicksand:wght@400;500;600;700&display=swap');

        *,
        ::after,
        ::before {
            box-sizing: border-box;
        }

       
        h1,
        h2,
        h3,
        h4,
        h5 {
            margin: 3rem 0 1.38rem;
            margin-top: 0;
            font-family: 'Quicksand', sans-serif;
            font-weight: 400;
            line-height: 1.3;
            text-transform: capitalize;
        }

        h1 {
            margin-top: 0;
            font-size: 3.052rem;
            font-weight: 500;
        }

        h2 {
            font-size: 2.441rem;
        }

        h3 {
            font-size: 1.953rem;
        }

        h4 {
            font-size: 1.563rem;
        }

        h5 {
            font-size: 1.25rem;
        }

        small,
        .text_small {
            font-size: 0.8rem;
        }

        p {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            max-width: 60ch;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        .btn-confirm {
            cursor: pointer;
            color: white;
            border-radius: .25rem;
            letter-spacing: 1px;
            padding: 0.375rem 0.75rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            transition: .5s ease;
            text-transform: capitalize;
            display: inline-block;
            background: black;
        }
    </style>
</head>

<body>
    <div style="
	background: #ffffff;
	display: block;
	width: auto;
	margin-left : 1rem ;
	padding: 0;
	position: relative;
	width: 400px;
	max-width: 90%;
">
        <table cellpadding="0" cellspacing="0" border="0" width="">
            <tbody>
                <!--Top row-->
                <tr id="top">
                    <!--Top-left corner-->
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tl-a1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-a2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-a3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-a4" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-a5" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-a6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-a7" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tl-b1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-b2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-b3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-b4" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-b5" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-b6" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-b7" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tl-c1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-c2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-c3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-c4" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-c5" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-c6" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-c7" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tl-d1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-d2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-d3" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-d4" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-d5" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-d6" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-d7" height="1" bgcolor="#f1f1f1">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tl-e1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-e2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-e3" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-e4" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-e5" height="1" bgcolor="#fafafa">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-e6" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-e7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tl-f1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-f2" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-f3" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-f4" height="1" bgcolor="#fafafa">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-f5" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-f6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-f7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tl-g1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-g2" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-g3" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-g4" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-g5" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-g6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tl-g7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <!--END Top-left corner-->

                    <!--Top shadow-->
                    <td height="5" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#f8f8f8">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <!--END Top shadow-->

                    <!--Top-right corner-->
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tr-a1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-a2" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-a3" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-a4" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-a5" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-a6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-a7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tr-b1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-b2" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-b3" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-b4" height="1" bgcolor="#fafafa">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-b5" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-b6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-b7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tr-c1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-c2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-c3" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-c4" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-c5" height="1" bgcolor="#fafafa">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-c6" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-c7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tr-d1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-d2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-d3" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-d4" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-d5" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-d6" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-d7" height="1" bgcolor="#f1f1f1">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tr-e1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-e2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-e3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-e4" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-e5" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-e6" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-e7" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tr-f1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-f2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-f3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-f4" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-f5" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-f6" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-f7" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="tr-g1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-g2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-g3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-g4" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-g5" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-g6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="tr-g7" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <!--END Top-right corner-->
                </tr>
                <!--END Top row-->

                <!--Middle row-->
                <tr id="middle">
                    <!--Middle-left shadow-->
                    <td height="100%" width="1" bgcolor="#fefefe">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#fcfcfc">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#f5f5f5">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#e8e8e8">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <!--END Middle-left shadow-->
                    <!--Content-->
                    <td width="auto" bgcolor="#ffffff">
                        <div style="max-width:400px;padding:2rem 1.5rem;">

                            <h3 style="color : black;">
                                You're on your way! <br>
                                Let's confirm your email address.
                            </h3>
                            <p style="color: black;
                                                    font-family: 'Nunito';
                                                    opacity: .7;
                                                    font-size: 1.2rem;">
                                By clicking on the following link, you will confirm your email address.
                            </p>
                            <a href="${origin}verify-email?token=${verificationToken}&email=${email}"
                                style="
                                            cursor: pointer;
                                            color: white;
                                            letter-spacing: 1px;
                                            padding: 1.6em 3.25em 1.6em;
                                            transition: .5s ease;
                                            display: inline-block;
                                            font-size: .7rem;
                                            text-transform: uppercase;
                                            background: black;">
                                Confirm Email Address
                            </a>




                        </div>
                    </td>
                    <!--END Content-->
                    <!--Middle-right shadow-->
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#e8e8e8">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#f5f5f5">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#fcfcfc">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <td height="100%" width="1" bgcolor="#fefefe">
                        <div style="width:1px;height:1px"></div>
                    </td>
                    <!--END Middle-right shadow-->
                </tr>
                <!--END Middle row-->

                <!--Bottom row-->
                <tr id="bottom">
                    <!--Bottom-left corner-->
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="bl-a1" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-a2" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-a3" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-a4" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-a5" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-a6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-a7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="bl-b1" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-b2" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-b3" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-b4" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-b5" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-b6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-b7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="bl-c1" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-c2" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-c3" height="1" bgcolor="#f8f8f8">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-c4" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-c5" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-c6" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-c7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="bl-d1" height="1" bgcolor="#e8e8e8">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-d2" height="1" bgcolor="#e9e9e9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-d3" height="1" bgcolor="#ececec">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-d4" height="1" bgcolor="#efefef">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-d5" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-d6" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-d7" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="bl-e1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-e2" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-e3" height="1" bgcolor="#e8e8e8">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-e4" height="1" bgcolor="#e0e0e0">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-e5" height="1" bgcolor="#ebebeb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-e6" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-e7" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="bl-f1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-f2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-f3" height="1" bgcolor="#fafafa">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-f4" height="1" bgcolor="#cdcdcd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-f5" height="1" bgcolor="#e0e0e0">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-f6" height="1" bgcolor="#f1f1f1">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-f7" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="bl-g1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-g2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-g3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-g4" height="1" bgcolor="#bbbbbb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-g5" height="1" bgcolor="#d4d4d4">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-g6" height="1" bgcolor="#eeeeee">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="bl-g7" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <!--END Bottom-left corner-->
                    <!--Bottom-middle shadow-->
                    <td height="5" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#afafaf">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#cfcfcf">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#ececec">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <!--END Bottom-middle shadow-->
                    <!--Bottom-right corner-->
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="br-a1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-a2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-a3" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-a4" height="1" bgcolor="#bbbbbb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-a5" height="1" bgcolor="#d4d4d4">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-a6" height="1" bgcolor="#eeeeee">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-a7" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="br-b1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-b2" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-b3" height="1" bgcolor="#fafafa">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-b4" height="1" bgcolor="#cdcdcd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-b5" height="1" bgcolor="#e0e0e">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-b6" height="1" bgcolor="#f1f1f1">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-b7" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="br-c1" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-c2" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-c3" height="1" bgcolor="#e8e8e8">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-c4" height="1" bgcolor="#e0e0e0">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-c5" height="1" bgcolor="#ebebeb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-c6" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-c7" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="br-d1" height="1" bgcolor="#e8e8e8">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-d2" height="1" bgcolor="#e9e9e9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-d3" height="1" bgcolor="#ececec">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-d4" height="1" bgcolor="#efefef">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-d5" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-d6" height="1" bgcolor="#fbfbfb">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-d7" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="br-e1" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-e2" height="1" bgcolor="#f6f6f6">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-e3" height="1" bgcolor="#f8f8f8">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-e4" height="1" bgcolor="#f9f9f9">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-e5" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-e6" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-e7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="br-f1" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-f2" height="1" bgcolor="#fcfcfc">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-f3" height="1" bgcolor="#fdfdfd">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-f4" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-f5" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-f6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-f7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td height="100%" width="1" bgcolor="#ffffff">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td id="br-g1" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-g2" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-g3" height="1" bgcolor="#fefefe">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-g4" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-g5" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-g6" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="br-g7" height="1" bgcolor="#ffffff">
                                        <div style="width:1px;height:1px"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <!--END Bottom-right corner-->
                </tr>
                <!--END Bottom row-->
            </tbody>
        </table>
    </div>


</body>

</html>
`

export default msg
