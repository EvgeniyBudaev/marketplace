package com.marketplace.backend.service.utils.queryes.processors;

import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.processors.command.OnlyBooleanCommand;
import com.marketplace.backend.service.utils.queryes.processors.command.OnlyDoubleCommand;
import com.marketplace.backend.service.utils.queryes.processors.command.OnlySelectedCommand;
import com.marketplace.backend.service.utils.queryes.processors.command.WithoutAttributesCommand;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
@Slf4j
public class QueryCommandBuilderImpl implements QueryCommandBuilder {
    private final HashMap<String,Class<? extends AbstractCommand>> commandList;

    public QueryCommandBuilderImpl(){
        commandList = new HashMap<>();
        commandList.put("EMPTY", WithoutAttributesCommand.class);
        commandList.put("_SEL", OnlySelectedCommand.class);
        commandList.put("_DOUBLE", OnlyDoubleCommand.class);
        commandList.put("_BOOL", OnlyBooleanCommand.class);
    }
    @Override
    public AbstractCommand createJpqlQueryCommand(ProductQueryParam queryParam) {

        Class<? extends AbstractCommand> clazz = commandList.get(createCommand(queryParam));
        if (clazz==null){
            log.error(queryParam.toString(),this);
            throw new IllegalRequestParam("Такую ситуацию мы не поддерживаем пока... Но работаем над этим");
        }
        try {
            return clazz.getDeclaredConstructor(ProductQueryParam.class).newInstance(queryParam);
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    private String createCommand(ProductQueryParam param){
        StringBuilder command = new StringBuilder();
        if(!param.getAttribute(EAttributeType.SELECTABLE).isEmpty()){
            command.append("_SEL");
        }
        if(!param.getAttribute(EAttributeType.BOOLEAN).isEmpty()){
            command.append("_BOOL");
        }
        if(!param.getAttribute(EAttributeType.DOUBLE).isEmpty()){
            command.append("_DOUBLE");
        }
        if(command.isEmpty()){
            return "EMPTY";
        }
        return command.toString();
    }
}
