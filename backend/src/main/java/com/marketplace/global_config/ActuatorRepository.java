package com.marketplace.global_config;

import org.springframework.boot.actuate.trace.http.HttpTrace;
import org.springframework.boot.actuate.trace.http.HttpTraceRepository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

import java.util.concurrent.CopyOnWriteArrayList;


public class ActuatorRepository implements HttpTraceRepository {

    List<HttpTrace> traceList = new CopyOnWriteArrayList<>();
    @Override
    public List<HttpTrace> findAll() {
        return this.traceList;
    }

    @Override
    public void add(HttpTrace trace) {
        HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                        .getRequest();

        if ("POST".equalsIgnoreCase(request.getMethod()))
        {
            try {
              String body = Arrays.toString(request.getInputStream().readAllBytes());
              trace.getRequest().getHeaders().put("body",List.of(body));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        if ("GET".equalsIgnoreCase(request.getMethod())){
            String queryString = request.getQueryString();
            if(queryString!=null){
                queryString = URLDecoder.decode(request.getQueryString(), StandardCharsets.UTF_8);
                trace.getRequest().getHeaders().put("query",List.of(queryString));
            }
            trace.getRequest().getHeaders().put("query2",List.of(request.getRequestURI()));

        }
        this.traceList.add(trace);
    }
}
