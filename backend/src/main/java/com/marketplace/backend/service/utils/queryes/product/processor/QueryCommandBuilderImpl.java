package com.marketplace.backend.service.utils.queryes.product.processor;

import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.product.processor.command.OnlyBooleanProductCommand;
import com.marketplace.backend.service.utils.queryes.product.processor.command.OnlyDoubleProductCommand;
import com.marketplace.backend.service.utils.queryes.product.processor.command.OnlySelectedProductCommand;
import com.marketplace.backend.service.utils.queryes.product.processor.command.WithoutAttributesProductCommand;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
@Slf4j
public class QueryCommandBuilderImpl implements QueryCommandBuilder {
    private final HashMap<String,Class<? extends AbstractProductCommand>> commandList;

    public QueryCommandBuilderImpl(){
        commandList = new HashMap<>();
        commandList.put("EMPTY", WithoutAttributesProductCommand.class);
        commandList.put("_SEL", OnlySelectedProductCommand.class);
        commandList.put("_DOUBLE", OnlyDoubleProductCommand.class);
        commandList.put("_BOOL", OnlyBooleanProductCommand.class);
    }
    @Override
    public AbstractProductCommand createJpqlQueryCommand(ProductQueryParam queryParam) {

        Class<? extends AbstractProductCommand> clazz = commandList.get(createCommand(queryParam));
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
