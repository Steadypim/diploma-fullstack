import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Tag
} from "@chakra-ui/react";
import {done, in_progress} from "../../services/transportationRoute.js";
import {errorNotification, successNotification} from "../../services/notification.js";
import {useState} from "react";

const ChangeStatusPopover = ({status, id}) => {

    const [currentStatus, setCurrentStatus] = useState(status);

    const makeDone = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            done(id).then(res => {
                successNotification("Статус успешно изменён")
                setCurrentStatus({ text: 'Прибыло', colorScheme: 'green' });
            }).catch(err => {
                errorNotification(
                    "Не удалось изменить статус, попробуйте позже"
                )
            })
        }
    }

    const makeInProgress = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            in_progress(id).then(res => {
                successNotification("Статус успешно изменён")
                setCurrentStatus({ text: 'В пути', colorScheme: 'yellow' });
            }).catch(err => {
                errorNotification(
                    "Не удалось изменить статус, попробуйте позже"
                )
            })
        }
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Tag ml={'5px'} cursor="pointer" colorScheme={currentStatus.colorScheme}>{currentStatus.text}</Tag>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverHeader>Изменить статус</PopoverHeader>
                <PopoverBody>
                    <Tag onClick={() => makeDone()} colorScheme={'green'} cursor="pointer">Прибыло</Tag>
                    <Tag ml={'5px'} onClick={() => makeInProgress()} colorScheme={'yellow'} cursor="pointer">В пути</Tag>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ChangeStatusPopover;