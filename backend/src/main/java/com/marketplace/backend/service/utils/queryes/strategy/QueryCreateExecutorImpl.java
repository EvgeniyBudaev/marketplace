package com.marketplace.backend.service.utils.queryes.strategy;

import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;
import com.marketplace.backend.service.utils.queryes.strategy.command.OnlyBooleanCommand;
import com.marketplace.backend.service.utils.queryes.strategy.command.OnlyDoubleCommand;
import com.marketplace.backend.service.utils.queryes.strategy.command.OnlySelectedCommand;
import com.marketplace.backend.service.utils.queryes.strategy.command.WithoutAttributesCommand;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
@Slf4j
public class QueryCreateExecutorImpl implements QueryCreateExecutor{
    private final HashMap<String,Class<? extends QueryCreateCommand>> commandList;

    public QueryCreateExecutorImpl(){
        commandList = new HashMap<>();
        commandList.put("000", WithoutAttributesCommand.class);
        commandList.put("100", OnlySelectedCommand.class);
        commandList.put("010", OnlyDoubleCommand.class);
        commandList.put("001", OnlyBooleanCommand.class);
    }
    @Override
    public QueryCreateCommand createJpqlQueryCommand(ProductQueryResolver resolver,String command) {
        Class<? extends QueryCreateCommand> clazz = commandList.get(command);
        if (clazz==null){
            log.error(command,this);
            throw new IllegalRequestParam("Такую ситуацию мы не поддерживаем пока... Но работаем над этим");
        }
        try {
            return clazz.getDeclaredConstructor(ProductQueryResolver.class).newInstance(resolver);
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }
}
